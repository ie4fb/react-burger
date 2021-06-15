import React from 'react';
import PropTypes from 'prop-types';
import constructorCardStyles from './constructor-card.module.css';
import { REMOVE_FROM_CART } from '../../services/actions/burger-constructor';
import{
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';

export default function ConstructorCard({ index, item, type }) {
  const dispatch = useDispatch();


  const onDelete = () => {
    dispatch({
        type:REMOVE_FROM_CART,
        index: index
    })
  };

  return (
    <li
      className={`${constructorCardStyles.item_wrapper} ${
        index === 0 ? '' : 'mt-4'
      }`}
      key={item._id}
    >
      <ConstructorElement
        type={type}
        isLocked={type === 'undefined' ? false : true}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() =>{onDelete()}}
      />
      {type === 'undefined' && (
        <div className={`${constructorCardStyles.icon_container}`}>
          <DragIcon type="primary" />{' '}
        </div>
      )}
    </li>
  );
}
