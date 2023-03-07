import {
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Popconfirm } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { instanceAxios } from '../axios/instance-axios';
import { ToastContext } from '../context/toast-context';
import { Cours } from './Calendrier';

const CourAdmin = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Lien avec le toast context
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);
  //
  const [count, setCount] = useState<number>(0);
  const [cours, setCours] = useState<Cours[]>();
  //
  const [Onesensei, setOnesensei] = useState<string>('');
  const [Onedate, setOnedate] = useState<string>('');
  const [Onestart, setOnestart] = useState<string>('');
  const [Oneend, setOneend] = useState<string>('');
  const [Onetype, setOnetype] = useState<string>('');
  const [Onenote, setOnenote] = useState<string>('');
  const [id, setId] = useState<string>('');
  //
  const sensei = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const start = useRef<HTMLInputElement>(null);
  const end = useRef<HTMLInputElement>(null);
  const type = useRef<HTMLInputElement>(null);
  const note = useRef<HTMLInputElement>(null);
  // Confirmation
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const text = 'Voulez vous vraiment supprimer ce cours ?';
  const description = 'Supprimer le cours';
  const [idDelete, setIdDelete] = useState<string>('');
  // test UTC
  var nowUtc = new Date();
  var utcString = nowUtc.toUTCString();
  console.log(utcString);

  const confirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    // // message.info('Clicked on Yes.');
    e.preventDefault();
    setIdDelete(e.currentTarget.value);
    setIsConfirm(true);
  };
  //
  useEffect(() => {
    instanceAxios
      .get<Cours[]>(
        `/cours/`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setCours(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]);

  // fin get ALL cours

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  // fonction création
  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(sensei.current?.value);
    console.log(date.current?.value, 'la date dans le create');
    console.log(start.current?.value, 'le debut dans le create');
    console.log(end.current?.value, 'la fin dans le create');
    // console.log(type.current?.value);
    // console.log(note.current?.value);

    instanceAxios
      .post(
        `/cours/`,
        {
          sensei: sensei.current?.value,
          date: date.current?.value,
          // FORMAT TIMESTAMP SANS TIME ZONE CORRECT
          heureDebut: `${date.current?.value}T${start.current?.value}:00.000Z`,
          heureFin: `${date.current?.value}T${end.current?.value}:00.000Z`,
          type: type.current?.value,
          note: note.current?.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setCount(count + 1);
        onToastChange(true);
        messageToast(`Cours créé`);
        colorToast('success');
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
        onToastChange(true);
        messageToast(`Erreur lors de la création du cours`);
        colorToast('danger');
      });
  };

  // ----------------------------- UPDATE -----------------------------
  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);

  const showModalUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value, 'showModalUpdate');
    setIsOpenUpdate(true);

    instanceAxios
      .get<Cours>(`/cours/${e.currentTarget.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response.data, 'à louverture de la modale');

        setOnesensei(response.data.sensei);
        // MISE AU FORMAT POUR LA DATE
        let date = new Date(response.data.date);
        console.warn(date, 'Date PB +1');
        date.setDate(date.getDate());
        console.warn('response.data.date ', response.data.date);
        console.warn('date ', date);
        let newDateString = date.toISOString().split('T')[0];
        console.warn('Jour select; ', newDateString);
        setOnedate(newDateString);
        // MISE AU FORMAT POUR L'HEURE
        const dateHeure = new Date(response.data.heureDebut);
        const hours = dateHeure.getUTCHours();
        const minutes = dateHeure.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        console.warn('Heure debut formated : ', formattedTime);
        setOnestart(formattedTime);
        const dateHeureFin = new Date(response.data.heureFin);
        const hoursFin = dateHeureFin.getUTCHours();
        const minutesFin = dateHeureFin
          .getMinutes()
          .toString()
          .padStart(2, '0');
        const formattedTimeFin = `${hoursFin}:${minutesFin}`;
        console.warn('Heure fin formated : ', formattedTimeFin);
        setOneend(formattedTimeFin);
        // FIN MISE AU FORMAT POUR L'HEURE
        setOnetype(response.data.type);
        setOnenote(response.data.note);
        setId(response.data.id);
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

  console.log(date.current?.value, 'la date dans le update');
  console.log(start.current?.value, 'le debut dans le update');
  console.log(end.current?.value, 'la fin dans le update');
  // console.log(Onedate, 'DATE');
  // console.log(Onestart, 'START');
  // console.log(Oneend, 'END');

  // console.log(newString, 'newDateString');
  const handleUpdate = (e: React.MouseEvent<HTMLFormElement>) => {
    console.log(e.currentTarget.value);
    e.preventDefault();

    instanceAxios
      .patch(
        `/cours/${id}/admin`,
        {
          sensei: sensei.current?.value,
          date: date.current?.value,
          heureDebut: `${date.current?.value}T${start.current?.value}:00.000Z`,
          heureFin: `${date.current?.value}T${end.current?.value}:00.000Z`,
          type: type.current?.value,
          note: note.current?.value,
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
    <div>
      <div className='d-flex justify-content-center border-bottom'>
        <button
          className='btn btn-primary btnDirection m-3'
          onClick={showModal}
        >
          Ajouter un cours
        </button>
      </div>

      {/* info */}
      {/* {isLoading ? (
        <div>Chargement...</div>
      ) : ( */}
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Création d'un cours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSumbit}>
              <div className='form-group'>
                <label htmlFor='sensei'>Sensei</label>
                <input
                  type='text'
                  className='form-control'
                  id='sensei'
                  placeholder='sensei'
                  required
                  ref={sensei}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='date'>Date</label>
                <input
                  type='date'
                  className='form-control'
                  id='date'
                  placeholder='date'
                  required
                  ref={date}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='date'>Heure début</label>
                <input
                  type='time'
                  className='form-control'
                  id='date'
                  placeholder='date'
                  required
                  ref={start}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='date'>Heure fin</label>
                <input
                  type='time'
                  className='form-control'
                  id='date'
                  placeholder='date'
                  required
                  ref={end}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='type'>Type de cours</label>
                <input
                  type='text'
                  className='form-control'
                  id='type'
                  placeholder='type'
                  required
                  ref={type}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='note'>Commentaire</label>
                <input
                  type='text'
                  className='form-control'
                  id='note'
                  placeholder='note'
                  ref={note}
                />
              </div>

              <button className='btn btn-primary btnDirection mt-3'>
                Valider
              </button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal} className='btn btn-primary btnPerso'>
            Fermer
          </button>
        </Modal.Footer>
      </Modal>
      {/* )} */}

      {/* MAP des Cours  */}

      <ul className='list-group pt-3'>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundColor: '#21252940',
          }}
        >
          {cours
            ?.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
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
                    title={`${x?.sensei} | ${x?.type}`}
                    description={`${new Date(x.heureDebut)
                      .getUTCHours()
                      .toLocaleString('fr')}h${new Date(x.heureDebut)
                      .getMinutes()
                      .toString()
                      .padStart(2, '0')}/${new Date(x?.heureFin)
                      .getUTCHours()
                      .toLocaleString('fr')}h${new Date(x?.heureFin)
                      .getMinutes()
                      .toString()
                      .padStart(2, '0')} le ${new Date(
                      x?.date
                    ).toLocaleDateString('fr')}`}
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
            <Modal.Title>Modification d'un cours</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={handleUpdate}>
                <div className='form-group'>
                  <label htmlFor='sensei'>Sensei</label>
                  <input
                    type='text'
                    className='form-control'
                    id='sensei'
                    placeholder='sensei'
                    required
                    ref={sensei}
                    value={Onesensei}
                    onChange={(e) => setOnesensei(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='date'>Date</label>
                  <input
                    type='date'
                    className='form-control'
                    id='date'
                    placeholder='date'
                    required
                    ref={date}
                    value={Onedate}
                    onChange={(e) => setOnedate(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='date'>Heure début</label>
                  <input
                    type='time'
                    className='form-control'
                    id='date'
                    placeholder='date'
                    required
                    ref={start}
                    value={Onestart}
                    onChange={(e) => setOnestart(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='date'>Heure fin</label>
                  <input
                    type='time'
                    className='form-control'
                    id='date'
                    placeholder='date'
                    required
                    ref={end}
                    value={Oneend}
                    onChange={(e) => setOneend(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='type'>Type de cours</label>
                  <input
                    type='text'
                    className='form-control'
                    id='type'
                    placeholder='type'
                    required
                    ref={type}
                    value={Onetype}
                    onChange={(e) => setOnetype(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='note'>Commentaire</label>
                  <input
                    type='text'
                    className='form-control'
                    id='note'
                    placeholder='note'
                    ref={note}
                    value={Onenote}
                    onChange={(e) => setOnenote(e.target.value)}
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

export default CourAdmin;
