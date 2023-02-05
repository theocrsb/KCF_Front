import { BookOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Card, Popconfirm } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { instanceAxios } from '../axios/instance-axios';
import { ToastContext } from '../context/toast-context';
import { User } from './Calendrier';

const SuperAdmin = () => {
  // Lien avec le toast context
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);
  //
  const [allUser, setAllUser] = useState<User[]>([]);
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
  }, []);

  // /-------------------------------------------------------------------------------------------------------------------------------------------------------
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const text = 'Voulez vous vraiment supprimer cet utilisateur ?';
  const description = `Supprimer l'utilisateur`;
  const [idDelete, setIdDelete] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const confirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    // // message.info('Clicked on Yes.');
    e.preventDefault();
    setIdDelete(e.currentTarget.value);
    setIsConfirm(true);
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
        // setOneRole(response.data.role.label)
        // setOneMember(response.data.member)
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log(error);
      });
  };

  const hideModalUpdate = () => {
    setIsOpenUpdate(false);
  };

  // console.log(newString, 'newDateString');
  const handleUpdate = (e: React.MouseEvent<HTMLFormElement>) => {
    console.log(e.currentTarget.value);
    e.preventDefault();

    instanceAxios
      .patch(
        `/users/${id}/admin`,
        {
          // role : role.current?.value
          //     member : member.current?.value
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
        messageToast(`Cours modifié avec succès`);
        colorToast('success');
        setIsOpenUpdate(false);
      })
      .catch((error) => {
        console.log('Error', error);
        onToastChange(true);
        messageToast(`Erreur lors de la création du cours`);
        colorToast('danger');
      });
  };

  // ----------------------------- DELETE -----------------------------

  const handleDelete = () => {
    // console.log(e.currentTarget.value);
    // e.preventDefault();

    // if (window.confirm('Voulez vous vraiment supprimer ce cours ?')) {
    if (isConfirm === true) {
      instanceAxios
        .delete(`/cours/${idDelete}/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then((response) => {
          // console.log('response', response);
          setCount(count + 1);
          onToastChange(true);
          messageToast(`cours supprimé`);
          colorToast('success');
          setIsConfirm(false);
        })
        .catch((error) => {
          console.log('Error', error);
          onToastChange(true);
          messageToast(`Erreur lors de suppression du cours`);
          colorToast('danger');
        });
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <ul className='list-group pt-3'>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundColor: '#32313140',
          }}
        >
          {allUser?.map((x, i) => (
            <li
              key={i}
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
                  avatar={<Avatar size={64} icon={<BookOutlined />} />}
                  title={`${x?.email}`}
                  description={`${x?.member}`}
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
            <Modal.Title>Modification d'un karatéka</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={handleUpdate}>
                <div className='form-group'>
                  <label htmlFor='role'>Role</label>
                  <input
                    type='text'
                    className='form-control'
                    id='role'
                    placeholder='role'
                    required
                    // ref={sensei}
                    // value={Onesensei}
                    // onChange={(e) => setOnesensei(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='membre'>Membre</label>
                  <input
                    type='text'
                    className='form-control'
                    id='membre'
                    placeholder='membre'
                    required
                    // ref={date}
                    // value={Onedate}
                    // onChange={(e) => setOnedate(e.target.value)}
                  />
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
