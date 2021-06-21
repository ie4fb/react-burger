import { useState, useEffect } from 'react';
import ingredientsCardStyles from './ingredients-card.module.css';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { SHOW_INGREDIENT_INFO } from '../../services/actions/ingredient-details';

export default function IngredientsCard({ item, index, type }) {
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();

  const { itemsList, currentBun } = useSelector(state => state.constructor);

  const [{ opacity }, ref] = useDrag({
    type: 'indredientsList',
    item: { id: item._id, type: item.type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const handleIngredientClick = () => {
    dispatch({
      type: SHOW_INGREDIENT_INFO,
      calories: item.calories,
      carbohydrates: item.carbohydrates,
      fat: item.fat,
      image_large: item.image_large,
      name: item.name,
      proteins: item.proteins,
    });
  };

  useEffect(() => {
    if (itemsList && currentBun) {
      type === 'bun'
        ? currentBun._id === item._id
          ? setCounter(1)
          : setCounter(0)
        : setCounter(itemsList.filter(x => x._id === item._id).length);
    }
  }, [itemsList, currentBun, type, item]);

  return (
    <li
      className={`${ingredientsCardStyles.card} ${
        index % 2 === 0 ? 'mr-6' : ''
      }`}
      ref={ref}
      onClick={handleIngredientClick}
      style={{ opacity }}
    >
      <img
        alt="изображение ингредиента"
        src={item.image_large}
        className={`${ingredientsCardStyles.image} mr-4 ml-4`}
      />
      <div className={`${ingredientsCardStyles.price} mt-1 mb-1`}>
        <p className={`text text_type_digits-default mr-2`}>{item.price}</p>
        <CurrencyIcon type={'primary'} />
      </div>
      <p
        className={`text text_type_main-default ${ingredientsCardStyles.name}`}
      >
        {item.name}
      </p>
      <div className={ingredientsCardStyles.counter}>
        <Counter count={counter} size="default" />
      </div>
    </li>
  );
}

IngredientsCard.propTypes = {
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
  type: PropTypes.string.isRequired,
};
