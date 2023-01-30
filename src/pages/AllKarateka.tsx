import React, { useContext } from 'react';
import { ToastContext } from '../context/toast-context';

const AllKarateka = () => {
  // Lien avec le toast context
  const { onToastChange } = useContext(ToastContext);
  const { messageToast } = useContext(ToastContext);
  const { colorToast } = useContext(ToastContext);
  //
  return <div>all Karateka</div>;
};

export default AllKarateka;
