import OrderItem from '../components/order-item/order-item';
import styles from './feed.module.css';
import { useSelector } from 'react-redux';
import { TOrderItem } from '../types/data';
import { useState, useEffect } from 'react';

type TOrders = {
  order: {
    orders: {
      orders: TOrderItem[];
      total: number;
      totalToday: number;
    };
  };
};

export default function Feed() {
  const { orders } = useSelector((store: TOrders) => store.order);
  const [completedOrdersList, setCompletedOrdersList] = useState<string[]>([]);
  const [pendingOrdersList, setPendingOrdersList] = useState<string[]>([]);

  useEffect(() => {
    if (orders && orders.orders) {
      orders.orders.forEach(order => {
        if (order.status === 'done') {
          setCompletedOrdersList(prevState => [...prevState, order.number]);
        } else {
          setPendingOrdersList(prevState => [...prevState, order.number]);
        }
      });
    }
  }, [orders]);

  //   useEffect(() => {
  //     console.log(completedOrdersList, pendingOrdersList);
  //   }, [completedOrdersList, pendingOrdersList]);

  //   console.log(orders);

  return (
    <section className={styles.container}>
      <h2 className={`text text_type_main-large mt-10`}>Лента заказов</h2>
      {orders && orders.orders && orders.orders.length && (
        <div className={`${styles.content} mt-5`}>
          <ul className={styles.list}>
            {orders.orders.map((item, index) => (
              <OrderItem place={'orders'} data={item} key={item._id} />
            ))}
          </ul>
          <div className={`${styles.info_container} ml-15`}>
            <div className={styles.orders_status}>
              <div className={`${styles.orders_list_continer} mr-9`}>
                <p className={`text text_type_main-medium mb-6`}>Готовы:</p>
                <div className={styles.orders_list}>
                  {!!completedOrdersList.length &&
                    completedOrdersList.slice(0, 10).map((item, index) => (
                      <p
                        key={index}
                        className={`text text_type_digits-default mb-2 ${styles.cyan}`}
                      >
                        {item}
                      </p>
                    ))}
                  {completedOrdersList.length > 10 &&
                    completedOrdersList.slice(10, 20).map((item, index) => (
                      <p
                        key={index}
                        className={`text text_type_digits-default mb-2 ${styles.cyan}`}
                      >
                        {item}
                      </p>
                    ))}
                </div>
              </div>
              <div className={styles.orders_list_continer}>
                <p className={`text text_type_main-medium mb-6`}>В работе:</p>
                <div className={styles.orders_list}>
                  {!!pendingOrdersList.length &&
                    pendingOrdersList.length !== 0 &&
                    pendingOrdersList.slice(0, 10).map((item, index) => (
                      <p
                        key={index}
                        className={`text text_type_digits-default mb-2`}
                      >
                        {item}
                      </p>
                    ))}
                  {pendingOrdersList.length > 10 &&
                    pendingOrdersList.slice(10, 20).map((item, index) => (
                      <p
                        key={index}
                        className={`text text_type_digits-default mb-2`}
                      >
                        {item}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <p className={`text text_type_main-medium mt-15`}>Выполнено за все время:</p>
            <p className={`text text_type_digits-large`}>{orders.total}</p>
            <p className={`text text_type_main-medium mt-15`}>Выполнено за сегодня:</p>
            <p className={`text text_type_digits-large`}>{orders.totalToday}</p>
          </div>

        </div>
      )}
    </section>
  );
}
