const strapi = require('@strapi/strapi');
const { resolve } = require("path");

strapi.createStrapi({ distDir: resolve(__dirname, './dist') }).start();