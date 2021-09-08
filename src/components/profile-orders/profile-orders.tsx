import OrderItem from '../order-item/order-item';
import styles from './profile-orders.module.css';
import { useSelector } from 'react-redux';
import { TOrderItem } from '../../types/data'
type TProfileOrders = {
  order: {
    orders: TOrderItem[]
  }
}

export default function ProfileOrders() {
  const { orders } = useSelector((store: TProfileOrders )=> store.order);
  return (
    <>
      {orders && orders.length && (
        <ul className={styles.list}>
          {orders.map((item, index) => (
            <OrderItem data={item} key={item._id} />
          ))}
        </ul>
      )}
    </>
  );
}
