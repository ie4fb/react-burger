import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import { getIngredients } from '../../services/actions/burger-ingredients';
import {
  CurrencyIcon,
  Counter,
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientsCard from '../ingredients-card/ingredients-card';
import {
  ADD_TO_CART,
  SET_BUN,
} from '../../services/actions/burger-constructor';

interface IngredientsData {
  _id: string;
  name: string;
  type: string;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  price: number;
  image?: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
}

interface BurgerIngredientsProps {
  data: IngredientsData[];
  openIngredientModal: () => void;
}

export default function BurgerIngredients({
  openIngredientModal,
}: BurgerIngredientsProps) {
  const [currentTab, setCurrentTab] = useState('bun');
  const dispatch = useDispatch();

  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    state => state.ingredients,
  );

  const [bunsContainer, isBunsContainerVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.9,
  });
  const [sauceContainer, isSauceContainerVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
  });
  const [mainContainer, isMainContainerVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  });

  const handleScroll = ref => {
    ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  useEffect(() => {
    isBunsContainerVisible
      ? setCurrentTab('buns')
      : isSauceContainerVisible
      ? setCurrentTab('sauce')
      : setCurrentTab('main');
  }, [isBunsContainerVisible, isSauceContainerVisible, isMainContainerVisible]);

  const handleCardClick = item => {
    if (item.type === 'bun') {
      dispatch({
        type: SET_BUN,
        item: item,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        item: item,
      });
    }
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  // useEffect(() => {
  //   if (ingredients) {
  //     setDecompiledData({
  //       buns: ingredients.filter(item => item.type === 'bun'),
  //       sauces: ingredients.filter(item => item.type === 'sauce'),
  //       main: ingredients.filter(item => item.type === 'main'),
  //     });
  //   }
  // }, [ingredients]);

  return (
    <section className={burgerIngredientsStyles.section}>
      <h1 className={`text text_type_main-large mb-5 mt-10`}>
        Соберите бургер
      </h1>
      <div style={{ display: 'flex' }}>
        <Tab
          value="buns"
          active={currentTab === 'buns'}
          onClick={() => {
            handleScroll(bunsContainer);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === 'sauce'}
          onClick={() => {
            handleScroll(sauceContainer);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === 'main'}
          onClick={() => {
            handleScroll(mainContainer);
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredientsStyles.lists_wrapper}`}>
        <div ref={bunsContainer} id="anchor" className={`${burgerIngredientsStyles.list_anchor} pt-10`}>
          <h2 className={`text text_type_main-medium`}>Булки</h2>
          <ul
            id="buns"

            className={`${burgerIngredientsStyles.list} pr-4 pl-4 pt-6 pb-10`}
          >
            {ingredients.buns.map((item, index) => (
              <IngredientsCard
                type={'bun'}
                onClick={handleCardClick}
                key={item._id}
                item={item}
                index={index}
                openIngredientModal={openIngredientModal}
              />
            ))}
          </ul>
        </div>
        <div ref={sauceContainer} id="anchor" className={`${burgerIngredientsStyles.list_anchor} pt-10`}>
          <h2 className={`text text_type_main-medium`}>Соусы</h2>
          <ul
            id="sauces"
            
            className={`${burgerIngredientsStyles.list} pr-4 pl-4 pt-6 pb-10`}
          >
            {ingredients.sauces.map((item, index) => (
              <IngredientsCard
                type={'sauce'}
                onClick={handleCardClick}
                key={item._id}
                item={item}
                index={index}
                openIngredientModal={openIngredientModal}
              />
            ))}
          </ul>
        </div>
        <div ref={mainContainer} id="anchor" className={`${burgerIngredientsStyles.list_anchor} pt-10`}>
          <h2 className={`text text_type_main-medium`}>Начинки</h2>
          <ul
            id="main"
            
            className={`${burgerIngredientsStyles.list} pr-4 pl-4 pt-6 pb-10`}
          >
            {ingredients.main.map((item, index) => (
              <IngredientsCard
                type={'main'}
                onClick={handleCardClick}
                key={item._id}
                item={item}
                index={index}
                openIngredientModal={openIngredientModal}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
