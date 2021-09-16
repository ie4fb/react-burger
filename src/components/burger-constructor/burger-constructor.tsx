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
} from '../../services/actions/burger-constructor';
import { RootState } from '../../services/reducers/';
import { TIngredientItem } from '../../types/data';

export default function BurgerConstructor() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (state: RootState) => state.ingredients
  );

  const dispatch = useDispatch();
  const { currentBun, itemsList, totalPrice } = useSelector(
    (state: RootState) => state.burgerConstructor,
  );

  const sendOrderRequest = () => {
    if (itemsList.length !== 0 && currentBun._id) {
      const arr = itemsList.map(item => item._id);
      arr.push(currentBun._id);
      dispatch(placeOrder(arr));
    }
  };

  const moveItem = (item: TIngredientItem) => {
    const ingredientType = item.type;
    const itemToAdd = ingredients[ingredientType].find(x => x._id === item._id);
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

  const [, dropTarget] = useDrop({
    accept: 'indredientsList',
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item: TIngredientItem) {
      moveItem(item);
    },
  });

  useEffect(() => {
      if (
        Object.keys(currentBun).length !== 0 &&
        currentBun.constructor === Object &&
        itemsList
      ) {
        dispatch({
          type: UPDATE_ORDER_PRICE,
        });
      }
  }, [currentBun, itemsList, dispatch]);

  return (
    <>
      {ingredientsRequest === false && ingredientsFailed === false && (
        <section className={`${burgerConstructorStyles.content} ml-10`}>
          <div
            ref={dropTarget}
            className={`${burgerConstructorStyles.list} mt-25 ml-5`}
            cypress-id="constructor"
          >
            {Object.keys(currentBun).length !== 0 &&
              currentBun.constructor === Object && currentBun._id && (
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
                    {itemsList.map((item, index) => (
                        <ConstructorCard
                          key={index}
                          item={item}
                          index={index.toString()}
                          type= {undefined}
                          id ={index.toString()}
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
