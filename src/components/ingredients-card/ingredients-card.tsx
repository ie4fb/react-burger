import { useState, useEffect } from 'react';
import ingredientsCardStyles from './ingredients-card.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { SHOW_INGREDIENT_INFO } from '../../services/actions/ingredient-details';
import { TIngredientItem } from '../../types/data';
import { RootState } from '../../services/reducers';

interface IIngredientsCardProps {
  item: TIngredientItem,
  index: string,
  type: 'bun' | 'sauce' | 'main'
}

export default function IngredientsCard({ item, index, type }:IIngredientsCardProps) {
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { itemsList, currentBun } = useSelector((state: RootState) => state.burgerConstructor);

  const [{ opacity }, ref] = useDrag({
    type: 'indredientsList',
    item: { _id: item._id, type: item.type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const handleIngredientClick = () => {
    history.replace({
      pathname: `/ingredients/${item._id}`,
      state: { background: location },
    });
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
          ? setCounter(2)
          : setCounter(0)
        : setCounter(itemsList.filter(x => x._id === item._id).length);
    }
  }, [itemsList, currentBun, type, item]);

  return (
    <li
      className={`${ingredientsCardStyles.card} ${
        parseInt(index) % 2 === 0 ? 'mr-6' : ''
      }`}
      ref={ref}
      onClick={handleIngredientClick}
      style={{ opacity }}
      cypress-id="ingredient"
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