import React, { useRef } from 'react';
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
import { TIngredientItem } from '../../types/data';

type TCardItem = TIngredientItem & { index: string };

interface ConstructorCardProps {
  id: string;
  index: string;
  item: TIngredientItem;
  type: 'top' | 'bottom' | undefined;
}

export default function ConstructorCard({
  id,
  index,
  item,
  type,
}: ConstructorCardProps) {
  const dispatch = useDispatch();
  const onDelete = () => {
    console.log(index)
    dispatch({
      type: REMOVE_FROM_CART,
      index: index,
    });
  };

  const updateCartOrder = (dragIndex: string, hoverIndex: string) => {
    dispatch({
      type: UPDATE_CART_ITEMS_ORDER,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };

  const ref = useRef<HTMLLIElement>(null);
  const [, drop] = useDrop({
    accept: 'constructorCards',

    hover(item: TCardItem, monitor) {
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
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;
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
  const [,drag] = useDrag({
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
        index === '0' ? '' : 'mt-4'
      }`}
    >
      <ConstructorElement
        type={type}
        isLocked={type === undefined ? false : true}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          console.log('here')
          onDelete();
        }}
      />
      {type === undefined && (
        <div className={`${constructorCardStyles.icon_container}`}>
          <DragIcon type="primary" />{' '}
        </div>
      )}
    </li>
  );
}
