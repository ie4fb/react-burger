import cardStyles from './card.module.css';
import PropTypes from 'prop-types';
import {
    CurrencyIcon,
    Counter,
  } from '@ya.praktikum/react-developer-burger-ui-components';
  

export default function Card({item, index, openIngredientModal }) {
  return (
    <li
      className={`${cardStyles.card} ${
        index % 2 === 0 ? 'mr-6' : ''
      }`}
      onClick={() => openIngredientModal(item)}
    >
      <img
        alt="изображение ингредиента"
        src={item.image_large}
        className={`${cardStyles.image} mr-4 ml-4`}
      />
      <div className={`${cardStyles.price} mt-1 mb-1`}>
        <p className={`text text_type_digits-default mr-2`}>{item.price}</p>
        <CurrencyIcon type={'primary'} />
      </div>
      <p
        className={`text text_type_main-default ${cardStyles.name}`}
      >
        {item.name}
      </p>
      <div className={cardStyles.counter}>
        <Counter count={1} size="default" />
      </div>
    </li>
  );
}

Card.propTypes = {
    item: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    index: PropTypes.number.isRequired,
    openIngredientModal: PropTypes.func.isRequired,
  };
