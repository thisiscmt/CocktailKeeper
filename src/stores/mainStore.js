import React, { createContext, useReducer } from 'react';

import Reducer from './mainReducer'

const initialState = {
    bannerMessage: '',
    bannerSeverity: ''
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState, undefined);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);

export default Store;
