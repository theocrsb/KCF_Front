import { Card, Col, Row } from 'antd';
import React, { useContext } from 'react';
import { ToastContext } from '../context/toast-context';

const AllKarateka = () => {
  // Lien avec le toast context
  const { onToastChange } = useContext(ToastContext);
  const { messageToast } = useContext(ToastContext);
  const { colorToast } = useContext(ToastContext);
  //
  const { Meta } = Card;
  return (
    <div>
      <h1>all Karateka</h1>
      {/* card */}
      <div className='' style={{ backgroundColor: 'grey', padding: '10px' }}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt='example'
              src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
            />
          }
        >
          <Meta title='Europe Street beat' description='www.instagram.com' />
        </Card>
      </div>
    </div>
  );
};

export default AllKarateka;
