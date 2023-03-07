import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth-context';
import { LoadingContext } from '../context/loading-spinner';
import { ToastContext } from '../context/toast-context';
import { instanceAxios } from './instance-axios';

interface InterceptorProps {
  children: JSX.Element;
}
const Interceptor = ({ children }: InterceptorProps) => {
  const { onLoadingChange } = useContext(LoadingContext);
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);
  const { UpdateToken, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
  // //console.log(children, 'children dans interceptor');
  useEffect(() => {
    // lors de depart de la request
    instanceAxios.interceptors.request.use((send: any) => {
      //console.log('send request START LOADING');
      // Lancement du chargement
      onLoadingChange(true);
      return send;
    });
    // lors de l'arrivé de la request
    instanceAxios.interceptors.response.use(
      (response) => {
        // fin du chargement et envoie de la reponse
        onLoadingChange(false);
        return response;
      },
      (error) => {
        //console.log(error);
        // fin du chargement et envoie de l'erreur
        onLoadingChange(false);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem('accessToken');
          onToastChange(true);
          messageToast(
            'Vous devez être connecté pour accéder à cette page. Veuillez vous connecter.'
          );
          colorToast('danger');
          UpdateToken('');
          setRole('');
          navigate('/connect');
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return children;
};

export default Interceptor;
