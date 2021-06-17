import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useSelector } from 'react-redux';

import Modal from '../modal/modal.js';

function App() {
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);


  const { orderRequest } = useSelector(state => state.order);
  const { isInfoRequested } = useSelector(state => state.ingredientInfo);

  const closeAllModals = () => {
    setIsIngredientModalOpen(false);
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
          type={'order'}
          onClose={closeAllModals}
          isOrderModalOpen={isOrderModalOpen}
        />
      )}
      {isIngredientModalOpen && (
        <Modal
          type={'ingredient'}
          onClose={closeAllModals}
          isOrderModalOpen={false}
        />
      )}
      <Main>
        <BurgerIngredients />
        <BurgerConstructor />
      </Main>
    </>
  );
}

export default App;
