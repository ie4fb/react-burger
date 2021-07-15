import OrderItem from '../order-item/order-item';
import styles from './profile-orders.module.css';
import { useSelector } from 'react-redux';

export default function ProfileOrders() {
  const { orders } = useSelector(store => store.order);
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
