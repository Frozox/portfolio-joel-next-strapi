'use client';

import { env } from '@/env.mjs';
import ContactContext, { TSavedArt } from '@/helpers/context/contact/contactContext';
import { useGetArts } from '@/helpers/hook/strapi/request';
import React from 'react';

type TContactProviderProps = {
  children: React.ReactNode,
}

export const ContactProvider = ({ children }: TContactProviderProps) => {
  const [savedArts, setSavedArts] = React.useState<TSavedArt[]>([]);
  const [defaultSavedArtsId, setDefaultSavedArtsId] = React.useState<number[]|undefined>();
  const artsQuery = useGetArts({ populate: 'thumbnail', filters: { id: { $in: defaultSavedArtsId?.length ? [...defaultSavedArtsId] : [null] }, sold_out: { $eq: false } } });

  const toggleSavedArt = (art: TSavedArt) => {
    setSavedArts((prevSavedArts) => {
      if (prevSavedArts.find((savedArt) => savedArt.id === art.id)) {
        return prevSavedArts.filter((savedArt) => savedArt.id !== art.id);
      } else {
        return [...prevSavedArts, art];
      }
    });
  };
  
  const clearSavedArts = () => {
    setSavedArts([]);
  };

  React.useEffect(() => {
    if (!artsQuery.response?.data) return;
    const defaultSavedArts: TSavedArt[] = artsQuery.response.data.map((art) => ({
      id: art.id,
      name: art.attributes.name,
      thumbnail: {
        url: `${env.NEXT_PUBLIC_BACKEND_HOST}${art.attributes.thumbnail.data.attributes.url}`,
        placeholder: art.attributes.thumbnail.data.attributes.placeholder,
        width: art.attributes.thumbnail.data.attributes.width,
        height: art.attributes.thumbnail.data.attributes.height,
      },
    }));
    if (defaultSavedArts.length === 0) return;
    setSavedArts(defaultSavedArts);
  }, [artsQuery.response?.data]);

  React.useEffect(() => {
    try {
      const savedArts: number[] = JSON.parse(localStorage.getItem('savedArts') || '[]');
      if (!Array.isArray(savedArts)) return;
      if (!savedArts.every((art) => typeof art === 'number')) return;
      setDefaultSavedArtsId(savedArts);
    } catch (error) {
      setDefaultSavedArtsId([]);
    }
  }, []);

  React.useEffect(() => {
    if (defaultSavedArtsId === undefined) return;
    localStorage.setItem('savedArts', JSON.stringify(savedArts.map((art) => art.id)));
  }, [savedArts, defaultSavedArtsId]);

  return (
    <ContactContext.Provider value={{ savedArts, toggleSavedArt, clearSavedArts }}>
      {children}
    </ContactContext.Provider>
  );
};