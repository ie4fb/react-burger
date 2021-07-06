import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import constructorCardStyles from './constructor-card.module.css';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_ITEMS_ORDER,
} from '../../services/actions/burger-constructor';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

export default function ConstructorCard({ id, index, item, type }) {
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      index: index,
    });
  };

  const updateCartOrder = (dragIndex, hoverIndex) => {
    dispatch({
      type: UPDATE_CART_ITEMS_ORDER,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };

  const ref = useRef(null);
  const [{}, drop] = useDrop({
    accept: 'constructorCards',

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      updateCartOrder(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{}, drag] = useDrag({
    type: 'constructorCards',
    item: () => {
      return { id, index };
    },
  });

  drag(drop(ref));

  return (
    <li
      id={index}
      ref={ref}
      className={`${constructorCardStyles.item_wrapper} ${
        index === 0 ? '' : 'mt-4'
      }`}
    >
      <ConstructorElement
        type={type}
        isLocked={type === 'undefined' ? false : true}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          onDelete();
        }}
      />
      {type === 'undefined' && (
        <div className={`${constructorCardStyles.icon_container}`}>
          <DragIcon type="primary" />{' '}
        </div>
      )}
    </li>
  );
}

ConstructorCard.propTypes = {
  item: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
