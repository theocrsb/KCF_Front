import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { instanceAxios } from '../axios/instance-axios';
import { ToastContext } from '../context/toast-context';
import { Role } from '../pages/Calendrier';

// ------------------------------------------------ METTRE A JOUR POUR MEMBER -----------------------------------------------------
interface RequireAuthProps {
  roles: string[];
}

const RequireAuth = ({ roles }: RequireAuthProps) => {
  // Lien avec le toast context
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);
  //

  const [label, setLabel] = useState<string>('');
  // setIsLoading permet d'afficher le continu de mes routes protected une fois qu'elles sont chargées.
  // sans ce state la condition est testé avant et refuse l'acces a une admin à la page admin
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    instanceAxios
      .get<Role>('/roles/my/role', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setLabel(response.data.label);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);
  console.log('roles dans le RequireAuth', roles);

  return isLoading ? (
    <div>Chargement...</div>
  ) : (
    <div>
      {label !== null && roles.includes(label) ? (
        <Outlet />
      ) : (
        <>
          {
            (onToastChange(true),
            messageToast(
              `Désolé, vous n'avez pas l'autorisation d'accéder à cette page`
            ),
            colorToast('danger'))
          }
          <Navigate to='/' />
        </>
      )}
    </div>
  );
};

export default RequireAuth;
