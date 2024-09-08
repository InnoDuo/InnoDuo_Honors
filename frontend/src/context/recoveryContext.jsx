import { createContext, useContext } from "react";

export const recoveryContext = createContext();
export const RecoveryProvider = recoveryContext.Provider

export default function useRecovery(){
    return useContext(recoveryContext)
}