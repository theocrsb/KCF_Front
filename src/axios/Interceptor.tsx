import { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth-context';
import { LoadingContext } from '../context/loading-spinner';
import { ToastContext } from '../context/toast-context';
import { instanceAxios } from './instance-axios';

interface InterceptorProps {
  children: JSX.Element;
}
const Interceptor = ({ children }: InterceptorProps) => {
  const { onLoadingChange } = useContext(LoadingContext);
  const { onToastChange } = useContext(ToastContext);
  const { messageToast } = useContext(ToastContext);
  const { colorToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const { UpdateToken, setRole } = useContext(AuthContext);

  useEffect(() => {
    instanceAxios.interceptors.request.use((send: any) => {
      // lors de depart de la request
      console.log('send request START LOADING');
      onLoadingChange(true);
      return send;
    });

    instanceAxios.interceptors.response.use(
      (response) => {
        onLoadingChange(false);
        return response;
      },
      (error) => {
        console.log(error);
        // 401 : pas connecté ou expiré
        // 403 : pas acces a cette donnée (pas bon role)

        if (error.response.data.statusCode === 401) {
          localStorage.removeItem('accessToken');
          onToastChange(true);
          messageToast(
            'Vous devez être connecté pour accéder à cette page. Veuillez vous connecter.'
          );
          // messageToast(error.response.data.message);
          colorToast('danger');
          UpdateToken('');
          setRole('');

          onLoadingChange(false);
          navigate('/connect');
        }
        onLoadingChange(false);
        return error;
      }
    );
  }, []);

  return children;
};

export default Interceptor;
