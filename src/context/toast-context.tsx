import { createContext, useState, ReactElement, Dispatch } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface ToastContextProps {
  children: ReactElement;
}

export interface ToastContextInterface {
  onToastChange: Dispatch<React.SetStateAction<boolean>>;
}

export const ToastContext = createContext<ToastContextInterface>({
  onToastChange: () => {},
});

export const ToastContextProvider = ({ children }: ToastContextProps) => {
  const [show, setShow] = useState<boolean>(false);

  const contextValue = {
    onToastChange: setShow,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer className='p-3' position='top-end'>
        <Toast
          show={show}
          onClose={() => setShow(false)}
          delay={3000}
          autohide={true}
        >
          <Toast.Header>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2'
              alt=''
            />
            <strong className='me-auto'>Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};
