import { createContext, useState, useEffect, ReactElement } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { PayloadToken, Role } from '../App';

interface AuthContextProps {
  children: ReactElement;
}
export interface AuthContextInterface {
  savedToken: string | null;
  UpdateToken: (token: string | null) => void;
  tokenExpirationFunction: (token: string | null) => void;
  tokenExpired: string | null;
  //
  role: string;
  setRole: (role: string) => void;
  member: boolean;
  setMember: (member: boolean) => void;
}
export const AuthContext = createContext<AuthContextInterface>({
  savedToken: null,
  UpdateToken: () => {},
  tokenExpirationFunction: () => {},
  tokenExpired: null,
  //
  role: '',
  setRole: () => {},
  member: true,
  setMember: () => {},
});
export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [role, setRole] = useState<string>('');
  const [member, setMember] = useState<boolean>(true);
  /**
   * Mise en place de la logique interne de notre context
   * Cela permet de mettre à dispo une fonction pour mettre
   * à jour l'état de connection de notre utilisateur
   * et d'accéder au token via notre context
   */
  let recupToken: string | null;
  recupToken = localStorage.getItem('accessToken');
  //   valeur localstorage ou null
  const [token, setToken] = useState<string | null>(
    recupToken ? recupToken : null
  );
  const [tokenExpired, setTokenExpired] = useState<string | null>(null);
  const updateToken = (token: string | null) => {
    setToken(token);
  };

  // Fonction contextuelle permettant de vérifier l'expiration d'un token
  const tokenExpirationFunction = (token: string | null) => {
    if (token) {
      const decoded: PayloadToken = jwt_decode(token);
      //
      setRole(decoded.role.label);
      setMember(decoded.member);
      //
      if (Date.now() <= decoded.exp * 1000) {
        setTokenExpired('token non expiré');
        return true;
      } else {
        setTokenExpired('token expiré');
        return false;
      }
    }
  };
  
  // Définition des valeurs accessibles via le context
  console.log("état d'expiration du token", tokenExpired);
  const contextValue = {
    savedToken: token,
    UpdateToken: updateToken,
    tokenExpirationFunction: tokenExpirationFunction,
    tokenExpired: tokenExpired,
    //
    role: role,
    setRole: setRole,
    member: member,
    setMember: setMember,
  };
  return (
    // Mise en place du fournisseur de context avec les valeurs définies
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
