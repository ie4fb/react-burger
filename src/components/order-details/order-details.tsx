import { useLottie } from 'lottie-react';
import doneAnimation from '../../images/done.json';
import orderDetailsStyles from './order-details.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers/';

interface IOrderDetailsProps {
  isOrderModalOpen: boolean
}

export default function OrderDetails({ isOrderModalOpen }: IOrderDetailsProps) {
  const { order, orderFailed, orderSuccess, orderRequest } = useSelector(
    (state: RootState) => state.order,
  );
  const DoneAnimation = () => {
    const options = {
      animationData: doneAnimation,
      loop: false,
      autoplay: true,
    };
    const { View } = useLottie(options);

    return View;
  };

  return (
    <>
      {orderFailed && !orderRequest && (
        <p className={`text text_type_main-default mt-15 mb-10`}>
          Что-то пошло не так
        </p>
      )}
      {orderRequest && (
        <p className={`text text_type_main-default mt-15 mb-10`}>Подождите</p>
      )}
      {orderSuccess && !orderRequest && (
        <>
          <p className={`text text_type_digits-large mt-30`}>{order}</p>
          <p className={`text text_type_main-medium mt-8`}>
            идентификатор заказа
          </p>
          <div className={`mt-15 ${orderDetailsStyles.image_container}`}>
            {isOrderModalOpen && <DoneAnimation />}
          </div>
          <p className={`text text_type_main-default mt-15`}>
            Ваш заказ начали готовить
          </p>
          <p
            className={`text text_type_main-default text_color_inactive mt-2 mb-30`}
          >
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </>
  );
}