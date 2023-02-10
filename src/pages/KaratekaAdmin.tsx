import { BookOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { instanceAxios } from '../axios/instance-axios';
import { ToastContext } from '../context/toast-context';
import { Karateka } from './Calendrier';

const KaratekaAdmin = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Lien avec le toast context
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);
  //
  const [count, setCount] = useState<number>(0);
  const [karateka, SetKarateka] = useState<Karateka[]>();
  //
  const [id, setId] = useState<string>('');
  const [onenote, setOneote] = useState<string>('');
  //
  const note = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    instanceAxios
      .get<Karateka[]>(
        `/karatekas/all/admin/`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        SetKarateka(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]);

  // ----------------------------- UPDATE -----------------------------
  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);

  const showModalUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value, 'showModalUpdate');
    setIsOpenUpdate(true);

    instanceAxios
      .get<Karateka>(`/karatekas/one/${e.currentTarget.value}/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response.data, 'à louverture de la modale');
        setId(response.data.id);
        setOneote(response.data.note);
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
        `/karatekas/${id}/admin`,
        {
          note: onenote,
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
        messageToast(`Commentaire modifié avec succès`);
        colorToast('success');
        setIsOpenUpdate(false);
      })
      .catch((error) => {
        console.log('Error', error);
        onToastChange(true);
        messageToast(`Erreur lors de la modification du commentaire`);
        colorToast('danger');
        setIsOpenUpdate(false);
      });
  };

  return (
    <div>
      <ul className='list-group pt-3'>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundColor: '#32313140',
          }}
        >
          {karateka
            ?.sort((a, b) => (a.prenom > b.prenom ? 1 : -1))
            .map((x, i) => (
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
                  ]}
                >
                  <Meta
                    avatar={<Avatar size={64} icon={<UserOutlined />} />}
                    title={`${x?.prenom} | ${x?.nom}`}
                    description={`ceinture : ${x.ceinture}`}
                  />
                </Card>
              </li>
            ))}
        </div>
      </ul>
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
                  <label htmlFor='sensei'>Commentaire sur le karatéka :</label>
                  <input
                    type='text'
                    className='form-control'
                    id='sensei'
                    placeholder='note'
                    // ref={note}
                    value={onenote}
                    onChange={(e) => setOneote(e.target.value)}
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

export default KaratekaAdmin;
