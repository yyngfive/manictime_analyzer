'use client';

import { createContext } from "react";

export const bigCardContext = createContext({});

export default function BigCardProvider({ children, query }) {

    return (
        <bigCardContext.Provider value={query}>
            {children}
        </bigCardContext.Provider >
    );
}