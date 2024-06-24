import { createContext, useContext, useState } from "react";

export const authContext = createContext({
    loggedIn: false,
    login: () => {},
    logout: () => {},
    user: null
});

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (user) => {
        setLoggedIn(true);
        setUser(user);
    };

    const logout = () => {
        setLoggedIn(false);
        setUser(null);
    };

    return (
        <authContext.Provider value={{ loggedIn, login, logout, user }}>
            {children}
        </authContext.Provider>
    );
};

export default function useAuth(){
    return useContext(authContext)
}