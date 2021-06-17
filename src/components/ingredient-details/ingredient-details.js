import ingredientDetailsStyles from './ingredient-datails.module.css';
import PropTypes from 'prop-types';



export default function IngredientDetails({ data }) {
  return (
    <>
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
    </>
  );
}

IngredientDetails.propTypes = {
    isOrderModalOpen: PropTypes.object.isRequired
  };