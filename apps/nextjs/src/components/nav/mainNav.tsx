'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdownMenu';
import { useContact } from '@/helpers/context/contact/contactContext';
import { useArtCategory } from '@/helpers/context/strapi/artCategoryContext';
import { cn } from '@/libs/utils';
import { AlignJustifyIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const MainNav = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const [dropdownOpened, setDropDownOpened] = useState<boolean>(false);
  const { artCategories, isError, isLoading } = useArtCategory();
  const { savedArts } = useContact();

  const toggleDropdown = () => {
    setDropDownOpened(!dropdownOpened);
  };

  return (
    <nav className={cn('fixed z-50', className)}>
      <div className="mx-auto flex flex-wrap items-center justify-between px-10 py-8">
        <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={'/logo.svg'} className="h-8 w-auto dark:invert" alt="Logo" width={0} height={0} />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Joël Chapeau</span>
        </Link>
        <Button onClick={toggleDropdown} type="button" variant="ghost" className="relative inline-flex size-10 items-center justify-center rounded-lg p-1 text-sm text-black focus:outline-none focus:ring-2 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-200 md:hidden">
          <span className="sr-only">Ouvrir le menu</span>
          <AlignJustifyIcon className="size-full" />
          {
            savedArts.length > 0 && !dropdownOpened &&
                <span className="absolute -right-3 -top-3 flex size-5 items-center justify-center rounded-full bg-red-600 p-2 text-sm text-white">{savedArts.length}</span>
          }
        </Button>
        <div className={cn('w-full md:block md:w-auto bg-background rounded-b-lg border md:border-none border-t-0 mt-4', !dropdownOpened && 'hidden')}>
          <ul className="flex flex-col p-4 text-lg font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0 rtl:space-x-reverse">
            <li>
              <Link href="/" className="block rounded px-3 py-2 text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent">Accueil</Link>
            </li>
            <li className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button disabled={isLoading || isError || artCategories.length === 0} className="block cursor-pointer rounded px-3 py-2 text-black hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent">
                    Travaux
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {artCategories.map((category) => {
                    return (
                      <DropdownMenuItem key={category.id} asChild>
                        <Link href={category.attributes.slug} className="size-full text-lg">{category.attributes.name}</Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li className="px-3 py-2 md:hidden">
              <div className="text-foreground opacity-50">Travaux</div>
              <ul>
                {artCategories.map((category) => {
                  return (
                    <li key={category.id}>
                      <Link href={category.attributes.slug} className="block rounded px-3 py-2 text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent">{category.attributes.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li>
              <Link href="/news" className="block rounded px-3 py-2 text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent">Nouveautés</Link>
            </li>
            <li className='relative'>
              <Link href="/contact" className="block rounded px-3 py-2 text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent">Contact</Link>
              {
                savedArts.length > 0 &&
                <span className="absolute -top-1 left-20 flex size-5 items-center justify-center rounded-full bg-red-600 p-2 text-sm text-white md:-right-5 md:-top-2 md:left-auto">{savedArts.length}</span>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;