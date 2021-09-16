import OrderItem from '../order-item/order-item';
import styles from './profile-orders.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { wsConnectionStart } from '../../services/actions/wsActions';
import { TOrderItem, TIngredientItem } from '../../types/data';
import { useState, useEffect } from 'react';
import { RootState } from '../../services/reducers/';
type TProfileOrders = {
  order: {
    orders: {
      orders: TOrderItem[];
     
    };
  };
  user: {
    accessToken: string
  }
};

export default function ProfileOrders() {
  const { orders } = useSelector((store: TProfileOrders) => store.order);
  const { accessToken } = useSelector((store: TProfileOrders) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      wsConnectionStart(
        `wss://norma.nomoreparties.space/orders?token=${
          accessToken?.split(' ')?.[1]
        }`,
      ),
    );
  }, [dispatch, accessToken])
 

  return (
    <>
      {!!orders && !!orders.orders.length && (
        <ul className={styles.list}>
          {orders.orders.map((item, index) => (
            <OrderItem place={'orders'} data={item} key={item._id} />
          ))}
        </ul>
      )}
    </>
  );
}
