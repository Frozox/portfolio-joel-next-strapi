'use client';

import React, { createContext } from 'react';

export interface TSavedArt {
  documentId: string;
  name: string;
  thumbnail: {
    url: string;
    thumbhash: ArrayBuffer;
    width: number;
    height: number;
  };
}

interface TContactContext {
  savedArts: TSavedArt[];
  toggleSavedArt: (art: TSavedArt) => void;
  clearSavedArts: () => void;
}

const ContactContext = createContext<TContactContext>({
  savedArts: [],
  toggleSavedArt: () => {},
  clearSavedArts: () => {},
});

export const useContact = () => React.use(ContactContext);

export default ContactContext;
