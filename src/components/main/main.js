import React, { useEffect } from 'react';
import mainStyles from './main.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Router,
  Route,
  useHistory,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { useDispatch, useSelector } from 'react-redux';

interface MainProps {
  children: React.ReactNode;
}
export default function Main({ children }: MainProps) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <main className={`${mainStyles.content}`}>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </main>
  );
}
