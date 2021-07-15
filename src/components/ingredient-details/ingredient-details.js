import ingredientDetailsStyles from './ingredient-datails.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { parseJsonConfigFileContent } from 'typescript';

export default function IngredientDetails() {
  const { state } = useLocation();
  const [data, setData] = useState({});
  const { ingredients } = useSelector(state => state.ingredients);
  const { id } = useParams();

  useEffect(() => {
    //Object.keys(ingredients).forEach((key) => ingredients.[key].find((item)=> item._id === itemId))
    //const keys = Object.keys(ingredients);
    Object.keys(ingredients).forEach(key => {
      const item = ingredients[key].find(item => item._id === id);
      if (item) {
        setData(item);
      }
    });
  }, [ingredients, id]);

  return (
    <div className={ingredientDetailsStyles.container}>
      <p
        className={`text text_type_main-large mt-10 mr-10 ml-10 ${ingredientDetailsStyles.title}`}
      >
        Детали ингредиента
      </p>
      <img
        className={`${ingredientDetailsStyles.image}`}
        src={data.image_large}
        alt="ингрединет"
      />
      <p className={`text text_type_main-medium mt-4`}>{data.name}</p>
      <ul className={`${ingredientDetailsStyles.list} mt-8 mb-15`}>
        <li className={`${ingredientDetailsStyles.list_item} mr-5`}>
          <p className={'text text_type_main-default text_color_inactive'}>
            Калории,ккал
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive mt-2 ${ingredientDetailsStyles.price}`}
          >
            {data.calories}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.list_item} mr-5`}>
          <p className={'text text_type_main-default text_color_inactive'}>
            Белки, г
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive mt-2 ${ingredientDetailsStyles.price}`}
          >
            {data.proteins}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.list_item} mr-5`}>
          <p className={'text text_type_main-default text_color_inactive'}>
            Жиры, г
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive mt-2 ${ingredientDetailsStyles.price}`}
          >
            {data.fat}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.list_item}`}>
          <p className={'text text_type_main-default text_color_inactive'}>
            Углеводы, г
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive mt-2 ${ingredientDetailsStyles.price}`}
          >
            {data.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}
