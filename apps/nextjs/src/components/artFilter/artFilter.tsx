'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigationMenu';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useArtFilter } from '@/helpers/context/strapi/artFilterContext';
import { cn } from '@/libs/utils';
import useEventListener from '@use-it/event-listener';
import * as KeyCode from 'keycode-js';
import { ArrowDownAZIcon, FilterIcon, Trash2Icon } from 'lucide-react';
import React from 'react';

type TMetaPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

type TFilterCategory = {
  id: string | number;
  name: string;
};

type TFilterItem = {
  tagId: string | number;
  categoryId: string | number;
  value: string;
  checked: boolean;
  defaultChecked?: boolean;
};

export const ArtFilterCheckboxList = ({
  name,
  children,
}: TFilterCategory & { children: React.ReactNode }) => {
  return (
    <div>
      <div>{name}</div>
      <ul>{children}</ul>
    </div>
  );
};

export const ArtFilterCheckboxItem = ({
  tagId,
  categoryId,
  value,
  checked,
  defaultChecked,
  ...props
}: TFilterItem & React.HTMLAttributes<HTMLElement>) => {
  return (
    <li>
      <Checkbox
        checked={checked}
        defaultChecked={defaultChecked}
        className="mr-2"
        id={`filter-${categoryId}-${tagId}`}
        {...props}
      />
      <label
        className="cursor-pointer select-none"
        htmlFor={`filter-${categoryId}-${tagId}`}
      >
        {value}
      </label>
    </li>
  );
};

export const ArtFilterPagination = ({className}:{className:string}) => {
  const {
    artsQuery: { response, isError, isLoading },
    pagination,
    setPagination,
  } = useArtFilter();

  const [metaPagination, setMetaPagination] = React.useState<TMetaPagination>({
    page: 1,
    pageSize: 0,
    pageCount: 1,
    total: 0,
  });
  const [extraPagesToDisplay, setExtraPagesToDisplay] = React.useState(0);

  // Switch pages with arrows
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (KeyCode.CODE_LEFT === e.code && metaPagination.page > 1)
      setPagination({ ...pagination, page: metaPagination.page - 1 });
    else if (KeyCode.CODE_RIGHT === e.code && metaPagination.page < metaPagination.pageCount)
      setPagination({ ...pagination, page: metaPagination.page + 1 });
  });
  
  React.useEffect(() => {
    if (!response?.meta) return;
    setMetaPagination(response.meta.pagination as TMetaPagination);
  }, [response?.meta]);

  React.useEffect(() => {
    let extaPagesCount = 0;
    if (metaPagination.page > 2) extaPagesCount++;
    if (metaPagination.page < metaPagination.pageCount - 1) extaPagesCount++;
    if (metaPagination.pageCount === 3 && metaPagination.page === 2)
      extaPagesCount++;
    if (metaPagination.pageCount > 3) extaPagesCount++;
    setExtraPagesToDisplay(extaPagesCount);
  }, [metaPagination]);

  return (
    <div className={cn('select-none', className)}>
      <hr className="mb-2 h-px w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-foreground to-transparent opacity-25" />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <button
              onClick={() =>
                setPagination({ ...pagination, page: metaPagination.page - 1 })
              }
              disabled={metaPagination.page <= 1}
              className={cn(metaPagination.page <= 1 && 'opacity-50')}
            >
              <PaginationPrevious />
            </button>
          </PaginationItem>
          {Array.from({ length: 3 }).map((_, i) => (
            <React.Fragment key={i}>
              {(i === 0 && (
                <>
                  <PaginationItem>
                    <PaginationLink isActive={metaPagination.page <= 1}>
                      <button
                        onClick={() =>
                          setPagination({ ...pagination, page: 1 })
                        }
                        disabled={metaPagination.page === 1}
                        className="size-full"
                      >
                        1
                      </button>
                    </PaginationLink>
                  </PaginationItem>
                  {metaPagination.page > 3 &&
                    metaPagination.pageCount !== 4 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </>
              )) ||
                (i === 2 && metaPagination.pageCount > 1 && (
                  <>
                    {metaPagination.page < metaPagination.pageCount - 2 &&
                      metaPagination.pageCount !== 4 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        isActive={
                          metaPagination.page >= metaPagination.pageCount
                        }
                      >
                        <button
                          onClick={() =>
                            setPagination({
                              ...pagination,
                              page: metaPagination.pageCount,
                            })
                          }
                          disabled={
                            metaPagination.page === metaPagination.pageCount
                          }
                          className="size-full"
                        >
                          {metaPagination.pageCount}
                        </button>
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )) || (
                <>
                  {Array.from({ length: extraPagesToDisplay }).map((_, j) => {
                    const page = metaPagination.page <= 2 ? j + 2 :
                      (metaPagination.page >= metaPagination.pageCount ? j + metaPagination.page - 2 :
                        j + metaPagination.page - 1);

                    return (
                      <React.Fragment key={j}>
                        <PaginationItem>
                          <PaginationLink isActive={metaPagination.page === page}>
                            <button
                              onClick={() =>
                                setPagination({ ...pagination, page })
                              }
                              disabled={metaPagination.page === page}
                              className="size-full"
                            >
                              {page}
                            </button>
                          </PaginationLink>
                        </PaginationItem>
                      </React.Fragment>
                    );
                  })}
                </>
              )}
            </React.Fragment>
          ))}
          <PaginationItem>
            <button
              onClick={() =>
                setPagination({ ...pagination, page: metaPagination.page + 1 })
              }
              disabled={metaPagination.page >= metaPagination.pageCount}
              className={cn(
                metaPagination.page >= metaPagination.pageCount && 'opacity-50',
              )}
            >
              <PaginationNext />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <hr className="mt-2 h-px w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-foreground to-transparent opacity-25" />
    </div>
  );
};

export const ArtFilter = ({ className }: { className?: string }) => {
  const {
    artTagCategoriesQuery: { response, isError, isLoading },
    setFilters,
  } = useArtFilter();
  const [filterCategories, setFilterCategories] = React.useState<
    TFilterCategory[]
  >([]);
  const [filterItems, setFilterItems] = React.useState<TFilterItem[]>([]);

  React.useEffect(() => {
    if (!response?.data) return;

    const [formatedFilterCategories, formatedFilterItems]: [
      TFilterCategory[],
      TFilterItem[],
    ] = response?.data.reduce(
      (
        accumulator: [TFilterCategory[], TFilterItem[]],
        currentArtTagCategory,
      ) => {
        return [
          [
            ...accumulator[0],
            {
              id: currentArtTagCategory.id,
              name: currentArtTagCategory.attributes.display_name,
            } as TFilterCategory,
          ],
          [
            ...accumulator[1],
            ...currentArtTagCategory.attributes.art_tags.data.map(
              (tag) =>
                ({
                  tagId: tag.id,
                  categoryId: currentArtTagCategory.id,
                  value: tag.attributes.tag,
                  checked: false,
                }) as TFilterItem,
            ),
          ],
        ];
      },
      [[], []],
    );

    setFilterCategories(formatedFilterCategories);
    setFilterItems(formatedFilterItems);
  }, [response?.data]);

  React.useEffect(() => {
    if (filterItems.length === 0) return;

    const filters: Record<string, unknown> = {
      $and: filterCategories.map((c) => ({
        art_tags: {
          $or: filterItems
            .filter((i) => i.categoryId === c.id && i.checked === true)
            .map((i) => ({
              id: i.tagId,
            })),
        },
      })),
    };

    setFilters(filters);
  }, [filterCategories, filterItems, setFilters]);

  return (
    <div className={cn('fixed z-40 w-full', className)}>
      <hr className="h-px w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-foreground to-transparent opacity-25" />
      <NavigationMenu className="space-x-2 md:space-x-0">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger disabled={isLoading || isError}>
              <div className="inline-flex">
                <FilterIcon />
                <span className="ml-1 flex items-center justify-center">
                  Filtres
                </span>
                <span className="ml-2 mr-1 rounded-lg bg-foreground p-1 text-xs text-background">
                  {filterItems.filter((i) => i.checked).length}
                </span>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="grid w-[calc(100vw-1rem)] grid-cols-2 gap-4 p-4 md:w-[600px] md:grid-cols-4">
              {filterCategories.map((category) => (
                <ArtFilterCheckboxList key={category.id} {...category}>
                  {filterItems
                    .filter((t) => t.categoryId === category.id)
                    .map((tag) => (
                      <ArtFilterCheckboxItem
                        onClick={() =>
                          setFilterItems((prev) =>
                            prev.map((t) => {
                              if (t.tagId !== tag.tagId) return t;
                              return { ...t, checked: !t.checked };
                            }),
                          )
                        }
                        key={tag.tagId}
                        {...tag}
                      />
                    ))}
                </ArtFilterCheckboxList>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger disabled={isLoading || isError}>
              <ArrowDownAZIcon />
              <span className="ml-1 flex items-center justify-center">
                Trier
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[250px] space-y-2 p-4">
                {filterCategories.map((category) => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <button
              disabled={filterItems.filter((i) => i.checked).length === 0}
              type="button"
              onClick={() =>
                setFilterItems((prev) =>
                  prev.map((t) => ({ ...t, checked: false })),
                )
              }
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            >
              <div className="inline-flex">
                <Trash2Icon />
                <span className="ml-1 flex items-center justify-center">
                  Vider
                </span>
              </div>
            </button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <hr className="h-px w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-foreground to-transparent opacity-25" />
    </div>
  );
};
