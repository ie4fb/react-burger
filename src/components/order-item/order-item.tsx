import styles from './order-item.module.css';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrderItem } from '../../types/data';
import { SHOW_ORDER_INFO } from '../../services/actions/order';
import {useDispatch} from 'react-redux';
interface IOrderItemProps {
  data: TOrderItem
}

function OrderCard({ data }: IOrderItemProps) {
  const history = useHistory();
  const { path } = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClick = () => {
    history.replace({
      pathname: `/profile/orders/${data._id}`,
      state: { background: location },
    });
    dispatch({
      type: SHOW_ORDER_INFO,
      order: data
    });
  };

  return (
    <li className={`${styles.card} mb-6 p-6`} onClick={handleClick}>
      <div className={styles.info}>
        <p className="text text_type_digits-default mb-6">#{data.number}</p>
        <p
          className={`${styles.date} text text_type_main-default text_color_inactive`}
        >
          {data.orderTime}
        </p>
      </div>
      <h2 className="text text_type_main-medium mb-2">{data.name}</h2>
      <p className="text text_type_main-default mb-6">Создан</p>
      <div className={styles.details}>
        <div className={styles.icons_container}>
          {data.ingredients.slice(0, 5).map(item => (
            <div className={styles.icon} key={item._id}>
              <img
                className={styles.icon_image}
                src={item.image_mobile}
                alt={item.name}
              />
            </div>
          ))}
        </div>
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">
            {data.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}

export default OrderCard;
