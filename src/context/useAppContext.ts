import { useContext } from "react";
import AppContext from "./AppContext";
import { AppContextProps } from "./types";

export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if(!context){
        throw new Error('App Context not properly set up');
    }
    return context;
} 