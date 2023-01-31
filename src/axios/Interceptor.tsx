import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        if (error.response.data.statusCode === 401) {
          //   navigate('/connect', { replace: true });
          onLoadingChange(false);
          localStorage.removeItem('accessToken');
          onToastChange(true);
          messageToast('Session expiré. Veuillez vous reconnecté plsssssss');
          colorToast('danger');
        }
      }
    );
  }, []);

  return children;
};

export default Interceptor;
