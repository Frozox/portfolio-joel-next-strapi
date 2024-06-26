'use client';

import React from 'react';

export type TSavedArt = {
  id: number;
  name: string;
  thumbnail: {
    url: string;
    placeholder: string;
    width: number;
    height: number;
  };
}

type TContactContext = {
    savedArts: TSavedArt[];
    toggleSavedArt: (art: TSavedArt) => void;
    clearSavedArts: () => void;
};

const ContactContext = React.createContext<TContactContext>({
  savedArts: [],
  toggleSavedArt: () => { },
  clearSavedArts: () => { },
});

export const useContact = () => React.useContext(ContactContext);

export default ContactContext;
