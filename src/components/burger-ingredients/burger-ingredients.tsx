import React, { useState, useEffect } from 'react';
import {
  CurrencyIcon,
  Counter,
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';

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
}

interface DecompiledData {
  buns: IngredientsData[];
  sauces: IngredientsData[];
  main: IngredientsData[];
}

export default function BurgerIngredients({ data }: BurgerIngredientsProps) {
  const [currentTab, setCurrentTab] = useState('bun');
  const [decompiledData, setDecompiledData] = useState<DecompiledData>({
    buns: [],
    sauces: [],
    main: [],
  });

  useEffect(() => {
    if (data) {
      setDecompiledData({
        buns: data.filter(item => item.type === 'bun'),
        sauces: data.filter(item => item.type === 'sauce'),
        main: data.filter(item => item.type === 'main'),
      });
    }
  }, [data]);

  return (
    <section className={burgerIngredientsStyles.section}>
      <h1 className={`text text_type_main-large mb-5 mt-10`}>
        Соберите бургер
      </h1>
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === 'sauce'}
          onClick={setCurrentTab}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === 'main'}
          onClick={setCurrentTab}
        >
          Начинки
        </Tab>
      </div>
      <h2 className={`text text_type_main-medium mt-10`}>Булки</h2>
      <ul className={`${burgerIngredientsStyles.list} pr-4 pl-4 pt-6 pb-10`}>
        {decompiledData.buns.map((item, index) => (
          <li className={`${burgerIngredientsStyles.card} ${index % 2 === 0?'mr-6':''}`}>
            <img
              alt="изображение ингредиента"
              src={item.image_large}
              className={`${burgerIngredientsStyles.image} mr-4 ml-4`}
            />
            <div className={`${burgerIngredientsStyles.price} mt-1 mb-1`}>
              <p className={`text text_type_digits-default mr-2`}>
                {item.price}
              </p>
              <CurrencyIcon type={'primary'} />
            </div>
            <p className={`text text_type_main-default`}>{item.name}</p>
            <div className={burgerIngredientsStyles.counter}>
              <Counter count={1} size="default" />
            </div>
          </li>
        ))}
      </ul>
      <h2 className={`text text_type_main-medium mt-10`}>Соусы</h2>
      <ul className={`${burgerIngredientsStyles.list} pr-4 pl-4 pt-6 pb-10`}>
        {decompiledData.sauces.map((item, index) => (
          <li className={`${burgerIngredientsStyles.card} ${index % 2 === 0?'mr-6':''}`}>
            <img
              alt="изображение ингредиента"
              src={item.image_large}
              className={`${burgerIngredientsStyles.image} mr-4 ml-4`}
            />
            <div className={`${burgerIngredientsStyles.price} mt-1 mb-1`}>
              <p className={`text text_type_digits-default mr-2`}>
                {item.price}
              </p>
              <CurrencyIcon type={'primary'} />
            </div>
            <p className={`text text_type_main-default`}>{item.name}</p>
            <div className={burgerIngredientsStyles.counter}>
              <Counter count={1} size="default" />
            </div>
          </li>
        ))}
      </ul>
      <h2 className={`text text_type_main-medium mt-10`}>Начинки</h2>
      <ul className={`${burgerIngredientsStyles.list} pr-4 pl-4 pt-6 pb-10`}>
        {decompiledData.main.map((item, index) => (
          <li className={`${burgerIngredientsStyles.card} ${index % 2 === 0?'mr-6':''}`}>
            <img
              alt="изображение ингредиента"
              src={item.image_large}
              className={`${burgerIngredientsStyles.image} mr-4 ml-4`}
            />
            <div className={`${burgerIngredientsStyles.price} mt-1 mb-1`}>
              <p className={`text text_type_digits-default mr-2`}>
                {item.price}
              </p>
              <CurrencyIcon type={'primary'} />
            </div>
            <p className={`text text_type_main-default`}>{item.name}</p>
            <div className={burgerIngredientsStyles.counter}>
              <Counter count={1} size="default" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
