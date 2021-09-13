import OrderItem from '../order-item/order-item';
import styles from './profile-orders.module.css';
import { useSelector } from 'react-redux';
import { TOrderItem, TIngredientItem } from '../../types/data'
import { useState, useEffect } from 'react'
import { RootState } from '../../services/reducers/';
type TProfileOrders = {
  order: {
    orders: {
      orders:TOrderItem[]
    }
  }
}

export default function ProfileOrders() {
  const { orders } = useSelector((store: TProfileOrders )=> store.order);

  return (
    <>
      {orders && orders.orders.length && (
        <ul className={styles.list}>
          {orders.orders.map((item, index) => (
            <OrderItem place={'orders'} data={item} key={item._id} />
          ))}
        </ul>
      )}
    </>
  );
}
