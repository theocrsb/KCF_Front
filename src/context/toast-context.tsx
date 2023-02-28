import { createContext, useState, ReactElement, Dispatch } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

interface ToastContextProps {
  children: ReactElement;
}

export interface ToastContextInterface {
  // on type nos values
  onToastChange: Dispatch<React.SetStateAction<boolean>>;
  messageToast: Dispatch<React.SetStateAction<string>>;
  colorToast: Dispatch<React.SetStateAction<string>>;
}

export const ToastContext = createContext<ToastContextInterface>({
  // on init nos values
  onToastChange: () => {},
  messageToast: () => {},
  colorToast: () => {},
});

export const ToastContextProvider = ({ children }: ToastContextProps) => {
  // functionTest();
  // toast selon la taille d'ecran
  const isBigScreen = useMediaQuery({ query: '(min-width: 700.1px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' });

  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const contextValue = {
    // A gauche, la valeur exportée : A droite, la valeur relié
    onToastChange: setShow,
    messageToast: setMessage,
    colorToast: setColor,
  };

  let now = new Date();
  let heureNow = `${now.getHours()}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
  // console.log(heureNow, 'now');
  // console.log(color);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer className='p-3 position-fixed' position='top-end'>
        <Toast
          show={show}
          onClose={() => setShow(false)}
          delay={5000}
          autohide={true}
          bg={color}
        >
          <Toast.Header>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2'
              alt=''
            />
            <strong className='me-auto'>Information</strong>
            <small>{heureNow}</small>
          </Toast.Header>
          <Toast.Body className='d-flex'>
            <>
              <img
                src={process.env.PUBLIC_URL + '/assets/karatekaDraw.svg'}
                alt='logo de karateka'
                width={50}
              />
              <p className='text-center' style={{ color: 'white' }}>
                {message}
              </p>
            </>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};
