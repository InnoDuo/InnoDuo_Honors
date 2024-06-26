import { createContext, useContext } from "react";

export const authContext = createContext({
    loggedIn: "false",
    login: (user) => {},
    logout: () => {},
    // user: null
});
export const AuthProvider = authContext.Provider

export default function useAuth(){
    return useContext(authContext)
}