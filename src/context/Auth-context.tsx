import { createContext, useState, useEffect, ReactElement } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { PayloadToken } from '../App';



interface AuthContextProps {
  children: ReactElement;
}
export interface AuthContextInterface {
  savedToken: string | null;
  UpdateToken: (token: string | null) => void;
  TokenExpirationFunction: (token: string | null) => void;
  tokenExpired: string | null;
}
export const AuthContext = createContext<AuthContextInterface>({
  savedToken: null,
  UpdateToken: (token: string | null) => {},
  TokenExpirationFunction: (token: string | null) => {},
  tokenExpired: null,
});
export const AuthContextProvider = ({ children }: AuthContextProps) => {
  /**
   * Mise en place de la logique interne de notre context
   * Cela permet de mettre à dispo une fonction pour mettre
   * à jour l'état de connection de notre utilisateur
   * et d'accéder au token via notre context
   */
  let recupToken: string | null;
  recupToken = localStorage.getItem('accesstoken');
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
      if (Date.now() <= decoded.exp * 1000) {
        setTokenExpired('token non expiré');
        return true;
      } else {
        setTokenExpired('token expiré');
        return false;
      }
    }
  };
  // Récupération d'une variable utilisable de token expiré
  console.log("état d'expiration du token", tokenExpired);
  const contextValue = {
    savedToken: token,
    UpdateToken: updateToken,
    TokenExpirationFunction: tokenExpirationFunction,
    tokenExpired: tokenExpired,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
