import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, List, Popconfirm } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { instanceAxios } from '../axios/instance-axios';
import { ToastContext } from '../context/toast-context';

interface MessageType {
  id: number;
  nom: string;
  email: string;
  message: string;
  createdAt: string;
}

const Messages = () => {
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);
  const [count, setCount] = useState<number>(0);
  const [allMessage, setAllMessage] = useState<MessageType[]>([]);
  const [idDelete, setIdDelete] = useState<string>('');
  const text = 'Voulez vous vraiment supprimer ce message ?';
  const description = 'Supprimer le message';

  const confirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    // // message.info('Clicked on Yes.');
    e.preventDefault();
    setIdDelete(e.currentTarget.value);
  };

  useEffect(() => {
    instanceAxios
      .get<MessageType[]>(
        `/messages`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setAllMessage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]);

  const handleDelete = () => {
    // console.log(e.currentTarget.value);
    // e.preventDefault();

    // if (window.confirm('Voulez vous vraiment supprimer ce cours ?')) {

    instanceAxios
      .delete(`/messages/${idDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        // console.log('response', response);
        setCount(count + 1);
        onToastChange(true);
        messageToast(`message supprimé`);
        colorToast('success');
      })
      .catch((error) => {
        console.log('Error', error);
        onToastChange(true);
        messageToast(`Erreur lors de suppression du cours`);
        colorToast('danger');
      });
  };

  console.log(allMessage);

  return (
    <div>
      {allMessage.length === 0 ? (
        <div
          className='text-center'
          style={{ fontWeight: 'bolder', fontSize: '2rem', padding: '20px' }}
        >
          Aucun message pour le moment
        </div>
      ) : (
        allMessage.map((x) => (
          <div key={x.id} className='card text-center m-5'>
            <div className='card-header'>
              Message de {x.nom}{' '}
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
              </Popconfirm>
            </div>
            <div className='card-body'>
              <h5 className='card-title'>{x.message}</h5>
              <p className='card-text'>Email : {x.email}</p>
            </div>
            <div className='card-footer text-muted'>
              {new Date(x.createdAt).toLocaleDateString('fr')}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
