import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientsCard from '../ingredients-card/ingredients-card';
import { RootState } from '../../services/reducers/';



export default function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState('bun');
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (state: RootState)  => state.ingredients,
  );
  const bunsContainerRef = useRef<HTMLDivElement>(null);
  const sauceContainerRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const isBunsContainerVisible = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.9,
    ref: bunsContainerRef
  });
  const isSauceContainerVisible = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
    ref: sauceContainerRef
  });
  const isMainContainerVisible = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
    ref: mainContainerRef
  });

  const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
    if((typeof ref !== 'boolean') && ref && ref.current) ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  useEffect(() => {
    isBunsContainerVisible
      ? setCurrentTab('bun')
      : isSauceContainerVisible
      ? setCurrentTab('sauce')
      : setCurrentTab('main');
  }, [isBunsContainerVisible, isSauceContainerVisible, isMainContainerVisible]);


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
                    key={item._id}
                    item={item}
                    index={index.toString()}
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
                    key={item._id}
                    item={item}
                    index={index.toString()}
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
                    key={item._id}
                    item={item}
                    index={index.toString()}
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
