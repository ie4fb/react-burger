import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { RESET_INGREDIENT_DATA } from '../../services/actions/ingredient-details';

import Modal from '../modal/modal.js';

function App() {
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  

  const { orderRequest } = useSelector(state => state.order);
  const { isInfoRequested } = useSelector(state => state.ingredientInfo);

  const dispatch = useDispatch();

  const closeAllModals = () => {
    if (isIngredientModalOpen) {
      setIsIngredientModalOpen(false);
      dispatch({
        type: RESET_INGREDIENT_DATA
      })
    }
    setIsOrderModalOpen(false);
  };

  const openIngredientModal = useCallback(() => {
    setIsIngredientModalOpen(true);
  }, [setIsIngredientModalOpen]);

  const openOrderModal = useCallback(() => {
    setIsOrderModalOpen(true);
  }, [setIsOrderModalOpen]);

  useEffect(() => {
    if(orderRequest) {
      openOrderModal();
    } else if (isInfoRequested) {
      openIngredientModal();
    } 
  }, [orderRequest, openOrderModal, openIngredientModal, isInfoRequested ]);

  return (
    <>
      <AppHeader />
      {isOrderModalOpen && (
        <Modal
          onClose={closeAllModals}
          isOrderModalOpen={isOrderModalOpen}
        >  <OrderDetails /></Modal>
      )}
      {isIngredientModalOpen && (
        <Modal
          onClose={closeAllModals}
          isOrderModalOpen={false}
        >  <IngredientDetails /></Modal>
      )}
      <Main>
        <BurgerIngredients />
        <BurgerConstructor />
      </Main>
    </>
  );
}

export default App;
