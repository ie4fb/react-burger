import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import burgerConstructorStyles from './burger-constructor.module.css';
import { placeOrder } from '../../services/actions/order';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorCard from '../constructor-card/constructor-card';
import {
  UPDATE_ORDER_PRICE,
  ADD_TO_CART,
  SET_BUN,
  FORCE_INITIAL_STATE
} from '../../services/actions/burger-constructor';

export default function BurgerConstructor() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    state => state.ingredients,
  );

  const dispatch = useDispatch();
  const { currentBun, itemsList, totalPrice } = useSelector(
    state => state.constructor,
  );
  
  useEffect(()=> {
    dispatch({
      type: FORCE_INITIAL_STATE,
    })
  }, [])

  const sendOrderRequest = () => {
    if (itemsList !== 0 && currentBun._id) {
      const arr = itemsList.map(item => item._id);
      arr.push(currentBun._id);
      dispatch(placeOrder(arr));
    }
  };

  const moveItem = item => {
    const ingredientType = item.type;
    const itemToAdd = ingredients[ingredientType].find(x => x._id === item.id);
    if (ingredientType === 'bun') {
      dispatch({
        type: SET_BUN,
        item: itemToAdd,
      });
    } else if (
      Object.keys(currentBun).length !== 0 &&
      currentBun.constructor === Object
    ) {
      dispatch({
        type: ADD_TO_CART,
        item: itemToAdd,
      });
    }
  };

  const [{ isHover }, dropTarget, drop] = useDrop({
    accept: 'indredientsList',
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      moveItem(item);
    },
  });

  useEffect(() => {
    if (currentBun && itemsList) {
      if (
        Object.keys(currentBun).length !== 0 &&
        currentBun.constructor === Object &&
        itemsList
      ) {
        dispatch({
          type: UPDATE_ORDER_PRICE,
        });
      }
    }
  }, [currentBun, itemsList, dispatch]);

  return (
    <>
      {
        ingredientsRequest === false &&
        ingredientsFailed === false && (
          <section className={`${burgerConstructorStyles.content} ml-10`}>
            <div
              ref={dropTarget}
              className={`${burgerConstructorStyles.list} mt-25 ml-5`}
            >
              
              {currentBun && Object.keys(currentBun).length !== 0 &&
                currentBun.constructor === Object && (
                  <>
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
                      {itemsList !== null && itemsList.map((item, index) => (
                        <ConstructorCard
                          key={index}
                          item={item}
                          index={index}
                          type="undefined"
                          id={index}
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
                  </>
                )}
            </div>
            <div className={`${burgerConstructorStyles.price_container} mt-10`}>
              <p className={'text text_type_digits-medium mr-10'}>
                {totalPrice} <CurrencyIcon type={'primary'} />
              </p>
              <Button onClick={sendOrderRequest} type="primary" size="medium">
                Оформить заказ
              </Button>
            </div>
          </section>
        )}
    </>
  );
}
