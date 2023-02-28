import { createContext, useState, ReactElement, Dispatch } from 'react';
import { useMediaQuery } from 'react-responsive';
import Interceptor from '../axios/Interceptor';
import LogoMicka from '../images/logoMickRetouch.png';

interface LoadingContextProps {
  children: ReactElement;
}

export interface LoadingContextInterface {
  onLoadingChange: Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextInterface>({
  onLoadingChange: () => {},
});

export const LoadingContextProvider = ({ children }: LoadingContextProps) => {
  const [show, setShow] = useState<boolean>(false);

  const contextValue = {
    onLoadingChange: setShow,
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      <>
        {children}
        {show && (
          <div className='d-flex'>
            <div className='d-flex justify-content-center align-items-center backdrop-spinner flex-column position-fixed opacity-75'>
              {/* <div className='spinner-border text-light' role='status'> */}
              <div className='loader' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          </div>
        )}
      </>
    </LoadingContext.Provider>
  );
};
