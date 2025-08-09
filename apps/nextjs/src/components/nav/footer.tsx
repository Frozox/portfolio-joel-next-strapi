'use client';

import FacebookIcon from '@components/icons/facebook';
import InstagramIcon from '@components/icons/instagram';
import LogoIcon from '@components/icons/logo';
import { useArtCategory } from '@helpers/context/strapi/artCategoryContext';
import Link from 'next/link';
import React from 'react';

interface FooterProps extends React.HtmlHTMLAttributes<HTMLElement> {}
interface FooterElementProps {
  title: string;
  children: React.ReactNode;
}

const FooterElement = (props: FooterElementProps) => {
  return (
    <li>
      <span className='text-sm font-bold uppercase sm:text-lg'>
        {props.title}
      </span>
      <ul className='mt-4 space-y-1 text-xs sm:text-base'>
        {React.Children.map(props.children, (children) => (
          <li>{children}</li>
        ))}
      </ul>
    </li>
  );
};

const Footer = (props: FooterProps) => {
  const { artCategories } = useArtCategory();

  return (
    <div {...props}>
      <hr className='my-8 h-[2px] w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-foreground to-transparent opacity-25' />
      <div className='flex flex-col space-y-3 md:flex-row md:space-y-0'>
        <div className='mb-6 flex self-center md:mb-0'>
          <Link
            href={'/'}
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <LogoIcon className='h-8 w-auto dark:invert' />
            <span className='self-center whitespace-nowrap text-2xl font-semibold'>
              Joel Chapeau
            </span>
          </Link>
        </div>
        <div className='w-full justify-end md:flex lg:justify-center'>
          <ul className='grid grid-cols-3 gap-8 lg:grid-cols-3'>
            <FooterElement title='Navigation'>
              <Link href={'/'}>
                <span>Accueil</span>
              </Link>
              <Link href={'/expositions'}>
                <span>Expositions</span>
              </Link>
              <Link href={'/contact'}>
                <span>Contact</span>
              </Link>
            </FooterElement>
            <FooterElement title='Travaux'>
              {...artCategories.map((artCategory) => (
                <Link key={artCategory.slug} href={artCategory.slug}>
                  <span>{artCategory.name}</span>
                </Link>
              ))}
            </FooterElement>
            <FooterElement title='Réseaux'>
              <Link
                rel='noopener noreferrer nofollw external'
                href={'https://www.instagram.com/joelchapeau/'}
                className='flex space-x-2'
                target='_blank'
              >
                <InstagramIcon />
                <span className='flex self-center'>Instagram</span>
              </Link>
              <Link
                rel='noopener noreferrer nofollw external'
                href={'https://www.facebook.com/joel.chapeau.7'}
                className='flex space-x-2'
                target='_blank'
              >
                <FacebookIcon />
                <span className='flex self-center'>Facebook</span>
              </Link>
            </FooterElement>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
