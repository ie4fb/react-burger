import styles from './order-item.module.css';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrderItem, TIngredientItem } from '../../types/data';
import { SHOW_ORDER_INFO } from '../../services/actions/order';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers/';
import { useState, useEffect } from 'react';
interface IOrderItemProps {
  data: TOrderItem;
  place: string
}

function OrderCard({ data, place }: IOrderItemProps) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDate, setOrderDate] = useState<string>('');

  const handleClick = () => {
    history.replace({
      pathname: `${place}/${data._id}`,
      state: { background: location },
    });
    dispatch({
      type: SHOW_ORDER_INFO,
      order: data,
    });
  };
  useEffect(() => {
    if (data) {
      let sum = 0
      data.ingredients.forEach((ingredient: string) => {
        const item = ingredients.bun.find(
          (item: TIngredientItem) => item._id === ingredient,
        ) ||
          ingredients.sauce.find(
            (item: TIngredientItem) => item._id === ingredient,
          ) ||
          ingredients.main.find(
            (item: TIngredientItem) => item._id === ingredient,
          ) || { type: 'bun', price: 0 };
        sum += item.type === "bun"? item?.price * 2: item?.price;
      });
      setTotalPrice(sum);
      const date = new Date(data.createdAt);
      setOrderDate(date.toLocaleString())
    }
  }, [data, ingredients]);

  const Icon = ({ id }: { id: string }) => {
    const item =
      ingredients.bun.find((item: TIngredientItem) => item._id === id) ||
      ingredients.sauce.find((item: TIngredientItem) => item._id === id) ||
      ingredients.main.find((item: TIngredientItem) => item._id === id) ||
      undefined;
    return (
      <>
        {item && (
          <div className={styles.icon} key={item._id}>
            <img
              className={styles.icon_image}
              src={item.image_mobile}
              alt={item.name}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <li className={`${styles.card} mb-6 p-6`} onClick={handleClick}>
      <div className={styles.info}>
        <p className="text text_type_digits-default mb-6">#{data.number}</p>
        <p
          className={`${styles.date} text text_type_main-default text_color_inactive`}
        >
          {orderDate}
        </p>
      </div>
      <h2 className="text text_type_main-medium mb-2">{data.name}</h2>
      <p className="text text_type_main-default mb-6">Создан</p>
      <div className={styles.details}>
        <div className={styles.icons_container}>
          {data.ingredients.slice(0, 5).map((id, index) => (
            <Icon key={index} id={id} />
          ))}
        </div>
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}

export default OrderCard;
