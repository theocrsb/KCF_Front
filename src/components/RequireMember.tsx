import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { instanceAxios } from '../axios/instance-axios';
import { ToastContext } from '../context/toast-context';
import { Role } from '../pages/Calendrier';

// ------------------------------------------------ METTRE A JOUR POUR MEMBER -----------------------------------------------------
interface MemberAuthProps {
  member: string[];
}

const MemberAuth = ({ member }: MemberAuthProps) => {
  // Lien avec le toast context
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);
  //

  const [returnMember, setReturnMember] = useState<string>('');
  // setIsLoading permet d'afficher le continu de mes routes protected une fois qu'elles sont chargées.
  // sans ce state la condition est testé avant et refuse l'acces a une admin à la page admin
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    instanceAxios
      .get<boolean>('/users/my/member', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response, 'dans le requireMember');
        if (response.data === true) {
          setReturnMember('member');
        } else {
          setReturnMember('notMember');
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);
  console.log('returnMember dans le MemberAuth', returnMember);

  return isLoading ? (
    <div>Chargement...</div>
  ) : (
    <div>
      {returnMember !== null && member.includes(returnMember) ? (
        <Outlet />
      ) : (
        <>
          {
            (onToastChange(true),
            messageToast(
              `Désolé, vous n'avez pas l'autorisation. Vous devez être membre du club pour y acceder à cette page.`
            ),
            colorToast('danger'))
          }
          <Navigate to='/profil/update' />
        </>
      )}
    </div>
  );
};

export default MemberAuth;
