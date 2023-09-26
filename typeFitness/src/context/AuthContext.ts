/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";



export const AuthContext = createContext({
    user: null,
    userData: null,
    setAppState: () => { }
})
