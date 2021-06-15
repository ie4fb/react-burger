import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import burgerConstructorStyles from './burger-constructor.module.css';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorCard from '../constructor-card/constructor-card';
import {
  SET_BUN,
  UPDATE_ORDER_PRICE,
} from '../../services/actions/burger-constructor';

export default function BurgerConstructor({ data, openOrderModal }) {
  //const [refArray, setRefArray] = useState([]);

  const dispatch = useDispatch();
  const { currentBun, itemsList, totalPrice } = useSelector(
    state => state.constructor,
  );
  const { ingredients } = useSelector(state => state.ingredients);

  useEffect(() => {
    if (
      Object.keys(currentBun).length === 0 &&
      currentBun.constructor === Object &&
      ingredients.buns.length !== 0
    ) {
      dispatch({
        type: SET_BUN,
        item: ingredients.buns[0],
      });
    }
  }, [currentBun, ingredients, dispatch]);

  useEffect(() => {
    if (
      Object.keys(currentBun).length !== 0 &&
      currentBun.constructor === Object &&
      itemsList
    )
      dispatch({
        type: UPDATE_ORDER_PRICE,
      });
  }, [currentBun, itemsList, dispatch]);

  return (
    <>
      {1 !== 0 && (
        <section className={`${burgerConstructorStyles.content} ml-10`}>
          <div className={`${burgerConstructorStyles.list} mt-25 ml-5`}>
            <div
              className={`${burgerConstructorStyles.item_wrapper} ${burgerConstructorStyles.item_wrapper_type_top} mb-4 ml-8`}
            >
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${currentBun.name} (верх)`}
                price={currentBun.price}
                thumbnail={currentBun.image}
              />
            </div>
            <ul className={burgerConstructorStyles.list_scrollable}>
              {itemsList.map((item, index) => (
                <ConstructorCard
                  key={index}
                  item={item}
                  index={index}
                  type="undefined"
                />
              ))}
            </ul>

            <div
              className={`${burgerConstructorStyles.item_wrapper}  ${burgerConstructorStyles.item_wrapper_type_bottom} mt-4 ml-8`}
            >
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${currentBun.name} (низ)`}
                price={currentBun.price}
                thumbnail={currentBun.image}
              />
            </div>
          </div>
          <div className={`${burgerConstructorStyles.price_container} mt-10`}>
            <p className={'text text_type_digits-medium mr-10'}>
              {totalPrice} <CurrencyIcon type={'primary'} />
            </p>
            <Button onClick={openOrderModal} type="primary" size="medium">
              Оформить заказ
            </Button>
          </div>
        </section>
      )}
    </>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
};
