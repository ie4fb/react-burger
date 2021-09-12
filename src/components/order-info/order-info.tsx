import styles from './order-info.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientItem, TOrderItem } from '../../types/data';

interface IIngredientProps {
  item: TIngredientItem;
}
type TOrder = {
  order: {
    orders: TOrderItem[]
  }
};

export default function OrderInfo() {
  const [order, setOrder] = useState<TOrderItem>();
  const { id } = useParams<{ id: string }>();
  const orders = useSelector((state: TOrder) => state.order.orders);
  useEffect(() => {
    console.log(id)
  }, [id])
  const Ingredient = ({ item }: IIngredientProps) => {
    return (
      <li className={`${styles.item} mb-4`}>
        <div className={`${styles.icon} mr-4`}>
          <img
            className={styles.image}
            src={item.image_mobile}
            alt={item.name}
          />
        </div>
        <p className={`mt-5 mb-5 text text_type_main-default`}>{item.name}</p>
        <div className={styles.price}>
          <span className="text text_type_digits-default">
            1 x {item.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </li>
    );
  };

  useEffect(() => {
    if (id && orders && orders.length) {
      setOrder(orders.find(x => x._id === id));
    }
  }, [id, orders]);
  return (
    <>
      {order && (
        <section className={styles.container}>
          <p className={`${styles.number} text text_type_digits-default mb-10`}>
            #{order.number}
          </p>
          <p className={`${styles.name} text text_type_main-medium mb-3`}>
            {order.name}
          </p>
          <p className={`${styles.status} text text_type_main-default mb-15`}>
            {order.status ? 'Выполнен' : 'Не выполнен'}
          </p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <ul className={`${styles.items} pr-6`}>
            {order.ingredients.map(item => (
              <Ingredient item={item} />
            ))}
          </ul>
          <div className={`${styles.info} mt-10`}>
            <p className={` text text_type_main-default text_color_inactive`}>
              Вчера, 13:50 i-GMT+3
            </p>
            <div className={styles.price}>
              <span className="text text_type_digits-default mr-2">510</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
