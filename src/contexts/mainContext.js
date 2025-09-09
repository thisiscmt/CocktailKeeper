import { createContext } from 'react';

export const initialState = {
    bannerMessage: '',
    bannerSeverity: ''
};

export const Context = createContext(initialState);
