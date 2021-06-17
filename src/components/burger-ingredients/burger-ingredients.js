import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientsCard from '../ingredients-card/ingredients-card';
import {
  ADD_TO_CART,
  SET_BUN,
} from '../../services/actions/burger-constructor';

export default function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState('bun');
  const dispatch = useDispatch();

  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    state => state.ingredients,
  );

  const [bunsContainerRef, isBunsContainerVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.9,
  });
  const [sauceContainerRef, isSauceContainerVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
  });
  const [mainContainerRef, isMainContainerVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  });

  const handleScroll = ref => {
    ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  useEffect(() => {
    isBunsContainerVisible
      ? setCurrentTab('bun')
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

  return (
    <>
      {!ingredientsRequest && !ingredientsFailed && (
        <section className={burgerIngredientsStyles.section}>
          <h1 className={`text text_type_main-large mb-5 mt-10`}>
            Соберите бургер
          </h1>
          <div style={{ display: 'flex' }}>
            <Tab
              value="bun"
              active={currentTab === 'bun'}
              onClick={() => {
                handleScroll(bunsContainerRef);
              }}
            >
              Булки
            </Tab>
            <Tab
              value="sauce"
              active={currentTab === 'sauce'}
              onClick={() => {
                handleScroll(sauceContainerRef);
              }}
            >
              Соусы
            </Tab>
            <Tab
              value="main"
              active={currentTab === 'main'}
              onClick={() => {
                handleScroll(mainContainerRef);
              }}
            >
              Начинки
            </Tab>
          </div>
          <div className={`${burgerIngredientsStyles.lists_wrapper}`}>
            <div
              ref={bunsContainerRef}
              id="anchor"
              className={`${burgerIngredientsStyles.list_anchor} pt-10`}
            >
              <h2 className={`text text_type_main-medium`}>Булки</h2>
              <ul
                id="bun"
                className={`${burgerIngredientsStyles.list} pr-4 pl-4 pt-6 pb-10`}
              >
                {ingredients.bun.map((item, index) => (
                  <IngredientsCard
                    type={'bun'}
                    onClick={handleCardClick}
                    key={item._id}
                    item={item}
                    index={index}
                  />
                ))}
              </ul>
            </div>
            <div
              ref={sauceContainerRef}
              id="anchor"
              className={`${burgerIngredientsStyles.list_anchor} pt-10`}
            >
              <h2 className={`text text_type_main-medium`}>Соусы</h2>
              <ul
                id="sauce"
                className={`${burgerIngredientsStyles.list} pr-4 pl-4 pt-6 pb-10`}
              >
                {ingredients.sauce.map((item, index) => (
                  <IngredientsCard
                    type={'sauce'}
                    onClick={handleCardClick}
                    key={item._id}
                    item={item}
                    index={index}
                  />
                ))}
              </ul>
            </div>
            <div
              ref={mainContainerRef}
              id="anchor"
              className={`${burgerIngredientsStyles.list_anchor} pt-10`}
            >
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
                  />
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
