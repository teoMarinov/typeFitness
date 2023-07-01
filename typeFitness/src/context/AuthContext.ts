import { createContext } from "react";


interface TypeUserData {
    email: string;
    handle: string;
    phoneNumber: string;
    uid: string
}
interface TypeContext {
    user: null | any;
    userData: null | TypeUserData;
    setAppState: React.Dispatch<React.SetStateAction<TypeContext>>;
}


export const AuthContext = createContext({
    user: null,
    userData: null,
    setAppState: () => { }
})
