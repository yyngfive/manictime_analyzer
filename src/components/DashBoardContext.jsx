'use client'

import { createContext } from "react"

export const dateContext = createContext({from:'',to:''})

export default function DashBoardProvider({children,settings}){

    return (
        <dateContext.Provider value={settings.date}>
            {children}
        </dateContext.Provider>
    );
}