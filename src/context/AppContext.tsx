import { createContext, useState } from "react";
import { user } from "../interface/user";

interface content {
    perfil: user;
    setPerfil: React.Dispatch<React.SetStateAction<user>>
}

export const AppContext = createContext({} as content);

export const ContextProvider = ({ children }) => {
    const [perfil,setPerfil] = useState({} as user)
  return <AppContext.Provider value={{perfil, setPerfil}}>{children}</AppContext.Provider>;
};
