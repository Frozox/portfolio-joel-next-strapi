'use client';

import { env } from '@env';
import ContactContext, {
  TSavedArt,
} from '@helpers/context/contact/contactContext';
import { useGetArts } from '@helpers/hook/strapi/request';
import { getMediaFromFormat } from '@libs/mediaFormat';
import React from 'react';

type TContactProviderProps = {
  children: React.ReactNode;
};

export const ContactProvider = ({ children }: TContactProviderProps) => {
  const [savedArts, setSavedArts] = React.useState<TSavedArt[]>([]);
  const [defaultSavedArtsId, setDefaultSavedArtsId] = React.useState<
    string[] | undefined
  >();
  const artsQuery = useGetArts({
    sort: 'sortOrder',
    populate: 'thumbnail',
    filters: {
      documentId: {
        $in: defaultSavedArtsId?.length ? [...defaultSavedArtsId] : [null],
      },
      sold_out: { $eq: false },
    },
  });

  const toggleSavedArt = (art: TSavedArt) => {
    setSavedArts((prevSavedArts) => {
      if (
        prevSavedArts.find((savedArt) => savedArt.documentId === art.documentId)
      ) {
        return prevSavedArts.filter(
          (savedArt) => savedArt.documentId !== art.documentId
        );
      } else {
        return [...prevSavedArts, art];
      }
    });
  };

  const clearSavedArts = () => {
    setSavedArts([]);
  };

  React.useEffect(() => {
    try {
      const savedArts: number[] = JSON.parse(
        localStorage.getItem('savedArts') || '[]'
      );
      if (!Array.isArray(savedArts)) return;
      if (!savedArts.every((art) => typeof art === 'string')) return;
      setDefaultSavedArtsId(savedArts);
    } catch (error) {
      setDefaultSavedArtsId([]);
    }
  }, []);

  React.useEffect(() => {
    if (!artsQuery.response?.data || !artsQuery.response?.data.length) return;
    const defaultSavedArts: TSavedArt[] = artsQuery.response.data.map((art) => {
      const formatedThumbnail = getMediaFromFormat(art.thumbnail, 'thumbnail');

      return {
        // @ts-expect-error
        documentId: art.documentId,
        name: art.name,
        thumbnail: {
          url: `${env.NEXT_PUBLIC_BACKEND_HOST}${formatedThumbnail.url}`,
          // @ts-expect-error
          thumbhash: art.thumbnail.thumbhash,
          width: formatedThumbnail.width,
          height: formatedThumbnail.height,
        },
      };
    });
    if (defaultSavedArts.length === 0) return;
    setSavedArts(defaultSavedArts);
  }, [artsQuery.response?.data]);

  React.useEffect(() => {
    if (defaultSavedArtsId === undefined) return;
    localStorage.setItem(
      'savedArts',
      JSON.stringify(savedArts.map((art) => art.documentId))
    );
  }, [savedArts, defaultSavedArtsId]);

  return (
    <ContactContext.Provider
      value={{ savedArts, toggleSavedArt, clearSavedArts }}
    >
      {children}
    </ContactContext.Provider>
  );
};
