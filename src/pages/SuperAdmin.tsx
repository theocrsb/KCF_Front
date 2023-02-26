import {
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Popconfirm } from 'antd';
import Meta from 'antd/es/card/Meta';
import axios from 'axios';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { instanceAxios } from '../axios/instance-axios';
import { ToastContext } from '../context/toast-context';
import { Role, User } from './Calendrier';

const SuperAdmin = () => {
  // Lien avec le toast context
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);
  //
  const [count, setCount] = useState<number>(0);
  const [allUser, setAllUser] = useState<User[]>([]);

  // // démo erreur oublie bearer
  // axios
  //   .get(`http://localhost:8080/api/users`)
  //   .then((response) => {
  //     console.log(response, 'response');
  //   })
  //   .catch((error) => {
  //     console.log('error', error);
  //   });

  useEffect(() => {
    instanceAxios
      .get<User[]>('/users/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response);
        setAllUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]);

  // /-------------------------------------------------------------------------------------------------------------------------------------------------------

  const [id, setId] = useState<string>('');

  const text = 'Voulez vous vraiment supprimer cet utilisateur ?';
  const description = `Supprimer l'utilisateur`;
  const [idDelete, setIdDelete] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //
  const [oneRole, setOneRole] = useState<string>('');
  const [allRole, setAllRole] = useState<Role[]>([]);
  const [oneMember, setOneMember] = useState<string>('');

  const confirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    // // message.info('Clicked on Yes.');
    e.preventDefault();
    setIdDelete(e.currentTarget.value);
  };

  // console.log(sensei.current?.value);
  // console.log(date.current?.value);
  // console.log(start.current?.value);
  // console.log(newStart);
  // console.log(end.current?.value);
  // console.log(newEnd);
  // console.log(type.current?.value);
  // console.log(note.current?.value);

  // ----------------------------- UPDATE -----------------------------
  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);

  const showModalUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value, 'showModalUpdate');
    setIsOpenUpdate(true);

    instanceAxios
      .get<User>(`/users/${e.currentTarget.value}/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response.data, 'à louverture de la modale');
        setOneRole(response.data.role.label);
        if (response.data.member === true) {
          setOneMember('oui');
        } else {
          setOneMember('non');
        }
        setId(response.data.id);

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log(error);
      });

    // get roles
    instanceAxios
      .get<Role[]>('/roles/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response, 'response');
        setAllRole(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const hideModalUpdate = () => {
    setIsOpenUpdate(false);
  };
  let valueId: string;
  let valueMember: boolean;
  // console.log(newString, 'newDateString');
  console.log(allRole, 'allrole');
  const handleUpdate = (e: React.MouseEvent<HTMLFormElement>) => {
    console.log(e.currentTarget.value);
    e.preventDefault();
    console.log(allRole, 'allrole');
    if (oneRole === 'user') {
      valueId = allRole[0].id;
    }
    if (oneRole === 'admin') {
      valueId = allRole[1].id;
    }
    if (oneRole === 'superadmin') {
      valueId = allRole[2].id;
    }

    if (oneMember === 'oui') {
      valueMember = true;
    } else {
      valueMember = false;
    }
    console.log(valueId, 'id avant le patch');
    instanceAxios
      .patch(
        `/users/${id}/admin`,
        {
          role: { id: valueId },
          member: valueMember,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((response) => {
        console.log('response', response);
        setCount(count + 1);
        onToastChange(true);
        messageToast(`Utilisateur modifié avec succès`);
        colorToast('success');
        setIsOpenUpdate(false);
      })
      .catch((error) => {
        console.log('Error', error);
        onToastChange(true);
        messageToast(`Erreur lors de la modification de l'utilisateur`);
        colorToast('danger');
      });
  };

  // ----------------------------- DELETE -----------------------------
  console.log(idDelete, 'idDelete avant delete');
  const handleDelete = () => {
    // console.log(e.currentTarget.value);
    // e.preventDefault();

    instanceAxios
      .delete(`/users/${idDelete}/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        // console.log('response', response);
        setCount(count + 1);
        onToastChange(true);
        messageToast(`Utilisateur supprimé`);
        colorToast('success');
      })
      .catch((error) => {
        console.log('Error', error);
        onToastChange(true);
        messageToast(`Erreur lors de suppression de l'Utilisateur`);
        colorToast('danger');
      });
  };

  console.log(allUser, 'tous les utilisateurs !');
  return (
    <div style={{ minHeight: '100vh' }}>
      <h3 className='pt-4 text-center'>Gestion des utilisateurs</h3>
      <ul className='list-group pt-3'>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundColor: '#21252940',
          }}
        >
          {allUser
            ?.sort((a, b) => (a.email > b.email ? 1 : -1))
            .map((x) => (
              <li
                key={`alluser-${x.id}`}
                style={{ margin: 16, listStyle: 'none', width: '350px' }}
              >
                <Card
                  style={{
                    width: '100%',
                    marginTop: 16,
                    marginBottom: 16,
                    minWidth: '100px',
                  }}
                  actions={[
                    <button
                      onClick={showModalUpdate}
                      value={x.id}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontSize: '150%',
                      }}
                    >
                      <EditOutlined />
                    </button>,
                    <Popconfirm
                      placement='top'
                      title={text}
                      description={description}
                      onConfirm={handleDelete}
                      okText='Oui'
                      cancelText='Non'
                    >
                      <button
                        onClick={confirm}
                        value={x.id}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          fontSize: '150%',
                        }}
                      >
                        <DeleteOutlined />
                      </button>
                    </Popconfirm>,
                  ]}
                >
                  <Meta
                    avatar={<Avatar size={64} icon={<UserOutlined />} />}
                    title={`${x?.email}`}
                    description={`${
                      x?.member === true ? 'Membre' : 'Non membre'
                    } | ${x.role.label}`}
                  />
                </Card>
              </li>
            ))}
        </div>
      </ul>
      {/* modale update */}
      {isLoading ? (
        <div>Chargement...</div>
      ) : (
        <Modal show={isOpenUpdate} onHide={hideModalUpdate}>
          <Modal.Header>
            <Modal.Title>Modification d'un utilisateur</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={handleUpdate}>
                <div className='form-group'>
                  <label htmlFor='role'>Role de l'utilisateur :</label>
                  <select
                    className='form-control'
                    id='role'
                    required
                    // ref={}
                    value={oneRole}
                    onChange={(e) => setOneRole(e.target.value)}
                  >
                    <option>user</option>
                    <option>admin</option>
                    <option>superadmin</option>
                  </select>
                </div>
                <div className='form-group pt-3'>
                  <label htmlFor='member'>Membre du club :</label>
                  <select
                    className='form-control'
                    id='member'
                    required
                    // ref={}
                    value={oneMember}
                    onChange={(e) => setOneMember(e.target.value)}
                  >
                    <option>oui</option>
                    <option>non</option>
                  </select>
                </div>

                <button className='btn btn-primary btnDirection mt-3'>
                  Valider
                </button>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={hideModalUpdate}
              className='btn btn-primary btnPerso'
            >
              Fermer
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default SuperAdmin;
