# ===========================
# Configuration
# ===========================
REGISTRY       = harbor.frozox.fr
PROJECT        = portfolio-joel
STRAPI_IMAGE   = $(REGISTRY)/$(PROJECT)/strapi
NEXTJS_IMAGE   = $(REGISTRY)/$(PROJECT)/nextjs
TAG            = latest

DOCKERFILE     = ./deploy/docker/Dockerfile
COMPOSE_FILE   = docker-compose.yml

# ===========================
# Default goal (prevent empty make)
# ===========================
.DEFAULT_GOAL := help

# ===========================
# Multi-arch builder
# ===========================
BUILDER_NAME   = harbor-builder

.PHONY: ensure-builder
ensure-builder:
	@if ! docker buildx ls | grep -q $(BUILDER_NAME); then \
		echo ">>> Creating buildx builder $(BUILDER_NAME)"; \
		docker buildx create --name $(BUILDER_NAME) --use; \
		docker buildx inspect $(BUILDER_NAME) --bootstrap; \
	else \
		echo ">>> Using existing builder $(BUILDER_NAME)"; \
		docker buildx use $(BUILDER_NAME); \
	fi

# ===========================
# Build & push images
# ===========================
.PHONY: deploy-strapi
deploy-strapi: ensure-builder
	docker buildx build \
		--platform linux/amd64,linux/arm64 \
		-t $(STRAPI_IMAGE):$(TAG) \
		-f $(DOCKERFILE) \
		--target strapi \
		--push .

.PHONY: deploy-nextjs
deploy-nextjs: ensure-builder
	docker buildx build \
		--platform linux/amd64,linux/arm64 \
		-t $(NEXTJS_IMAGE):$(TAG) \
		-f $(DOCKERFILE) \
		--target nextjs \
		--push .

.PHONY: deploy-all
deploy-all: deploy-strapi deploy-nextjs

# ===========================
# Deployment (docker compose)
# ===========================
.PHONY: up
up:
	docker compose -f $(COMPOSE_FILE) up -d

.PHONY: down
down:
	docker compose -f $(COMPOSE_FILE) down

.PHONY: restart
restart: down up

# ===========================
# Utilities
# ===========================
.PHONY: login
login:
	docker login $(REGISTRY)

.PHONY: clean
clean:
	docker system prune -af --volumes

# ===========================
# Help
# ===========================
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  make login         -> docker login to registry"
	@echo "  make deploy-strapi -> build+push strapi image"
	@echo "  make deploy-nextjs -> build+push nextjs image"
	@echo "  make deploy-all    -> build+push all images"
	@echo "  make up            -> start stack with docker-compose"
	@echo "  make down          -> stop stack"
	@echo "  make restart       -> restart stack"
	@echo "  make clean         -> prune docker system"
