import React from 'react';

export const initialState = {
    bannerMessage: '',
    bannerSeverity: ''
};

export const Context = React.createContext(initialState);
