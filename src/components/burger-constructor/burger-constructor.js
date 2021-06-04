import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerConstructor({ data , openOrderModal}) {
  const [refArray, setRefArray] = useState([]);

  useEffect(() => {
    if (data) {
      const arr = [];
      data.forEach(item => {
        const ref = createRef();
        arr.push(ref);
      });
      setRefArray(arr);
    }
  }, [data]);

  useEffect(() => {
    if (refArray.length !== 0) {
      refArray.forEach(elementRef => {
        if (elementRef.current) {
          //   elementRef.current.childNodes[0].classList.add(
          //     burgerConstructorStyles.item_container,
          //   );
          elementRef.current.childNodes[0].style.width = '100%';
          elementRef.current.childNodes[0].childNodes[0].childNodes[1].style.flexGrow = 1;
        }
      });
    }
  }, [refArray, data]);

  return (
    <>
      {refArray.length === data.length && refArray.length !== 0 && (
        <section className={`${burgerConstructorStyles.content} ml-10`}>
          <div className={`${burgerConstructorStyles.list} mt-25 ml-4`}>
            <div
              className={`${burgerConstructorStyles.item_wrapper} ${burgerConstructorStyles.item_wrapper_type_top} mb-4 ml-8`}
              ref={refArray[0]}
            >
              <ConstructorElement
                type="top"
                isLocked={true}
                text={data[0].name}
                price={data[0].price}
                thumbnail={data[0].image}
              />
            </div>
            <ul className={burgerConstructorStyles.list_scrollable}>
              {data.slice(1, data.length - 1).map((item, index) => (
                <div
                  className={`${burgerConstructorStyles.item_wrapper} ${
                    index === 0 ? '' : 'mt-4'
                  }`}
                  ref={refArray[index + 1]}
                  key={item._id}
                >
                  <ConstructorElement
                    type="undefined"
                    isLocked={false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                  <div className={`${burgerConstructorStyles.icon_container}`}>
                    <DragIcon type="primary" />{' '}
                  </div>
                </div>
              ))}
            </ul>

            <div
              className={`${burgerConstructorStyles.item_wrapper}  ${burgerConstructorStyles.item_wrapper_type_bottom} mt-4 ml-8`}
              ref={refArray[refArray.length - 1]}
            >
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={data[data.length - 1].name}
                price={data[data.length - 1].price}
                thumbnail={data[data.length - 1].image}
              />
            </div>
          </div>
          <div className={`${burgerConstructorStyles.price_container} mt-10`}>
            <p className={'text text_type_digits-medium mr-10'}>
              610 <CurrencyIcon type={'primary'} />
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
