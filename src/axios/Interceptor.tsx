import { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
  useEffect(() => {
    instanceAxios.interceptors.request.use((send: any) => {
      // lors de depart de la request
      console.log('send request START LOADING');
      onLoadingChange(true);
      return send;
    });
    // instanceAxios.interceptors.response.use((response: any) => {
    //   console.log('get response END LOAD', response);
    //   onLoadingChange(false);
    //   if (response.response.data.statusCode === 401) {
    //     navigate('/connect', { replace: true });
    //     onToastChange(true);
    //     messageToast('Session expiré. Veuillez vous reconnecté');
    //     colorToast('danger');
    //   }
    //   return response;
    // });
    instanceAxios.interceptors.response.use(
      (response) => {
        onLoadingChange(false);
        return response;
      },
      (error) => {
        // 401 : pas connecté ou expiré
        // 403 : pas acces a cette donnée (pas bon role)
        if (error.response.data.statusCode === 401) {
          onToastChange(true);
          messageToast('Session expirée. Veuillez vous reconnecter');
          colorToast('danger');
          onLoadingChange(false);
        }

        // if (error.response.data.statusCode === 403) {
        //   //   navigate('/connect', { replace: true });
        //   localStorage.removeItem('accessToken');
        //   onToastChange(true);
        //   messageToast(`Vous n'avez pas accès à ce contenu`);
        //   colorToast('danger');
        //   onLoadingChange(false);
        // }
      }
    );
  }, []);

  return children;
};

export default Interceptor;
