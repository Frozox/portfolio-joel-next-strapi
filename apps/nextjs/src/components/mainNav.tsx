"use client"

import { cn } from "@/libs/utils";
import { AlignJustifyIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdownMenu";
import React from "react";
import { useArtCategory } from "@/helpers/hook/strapi/strapiSdk";

const MainNav = ({ className }: React.HTMLAttributes<HTMLElement>) => {
    const [dropdownOpened, setDropDownOpened] = useState<boolean>(false);
    const { artCategories } = useArtCategory();

    const toggleDropdown = () => {
        setDropDownOpened(!dropdownOpened);
    }

    return (
        <nav className={cn("w-full fixed z-50", className)}>
            <div className="flex flex-wrap items-center justify-between mx-auto px-10 py-8">
                <Link href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src={"/logo.svg"} className="h-8 w-auto dark:invert" alt="Logo" width={0} height={0} />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Joël Chapeau</span>
                </Link>
                <Button onClick={toggleDropdown} type="button" variant="ghost" className="inline-flex items-center p-1 w-10 h-10 justify-center text-sm text-black dark:text-white rounded-lg md:hidden focus:outline-none focus:ring-2 dark:focus:ring-gray-200 dark:hover:bg-gray-700">
                    <span className="sr-only">Ouvrir le menu</span>
                    <AlignJustifyIcon className="h-full w-full" />
                </Button>
                <div className={cn("w-full md:block md:w-auto bg-background rounded-b-lg border md:border-none border-t-0 mt-4", !dropdownOpened && "hidden")}>
                    <ul className="flex flex-col font-medium p-4 md:p-0 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 text-lg">
                        <li>
                            <Link href="/" className="block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Accueil</Link>
                        </li>
                        <li className="hidden md:block">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="cursor-pointer block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Travaux
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {artCategories.map((category) => {
                                        return (
                                            <DropdownMenuItem key={category.id} asChild>
                                                <Link href={category.attributes.slug} className="w-full h-full text-lg">{category.attributes.name}</Link>
                                            </DropdownMenuItem>
                                        )
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                        <li className="md:hidden py-2 px-3">
                            <div className="text-foreground opacity-25">Travaux</div>
                            <ul>
                                {artCategories.map((category) => {
                                    return (
                                        <li>
                                            <Link href={category.attributes.slug} className="block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">{category.attributes.name}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                        <li>
                            <Link href="/archives" className="block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Archives</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MainNav;