import React, { useState } from 'react';
// import { Router, Route, useHistory, Switch } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import useApi from '../../hooks/useApi';

import Modal from '../modal/modal.js';

function App() {
  // const history = useHistory();
  const [status, data] = useApi(
    'https://norma.nomoreparties.space/api/ingredients',
    'GET',
  );

  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);

  const closeAllModals = () => {
    setIsIngredientModalOpen(false);
    setIsOrderModalOpen(false);
    setCurrentIngredient(null);
  };

  const openIngredientModal = data => {
    setCurrentIngredient({
      calories: data.calories,
      carbohydrates: data.carbohydrates,
      fat: data.fat,
      image_large: data.image_large,
      name: data.name,
      proteins: data.proteins,
    });
    setIsIngredientModalOpen(true);
  };

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };

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
      {isIngredientModalOpen && currentIngredient && (
        <Modal
          type={'ingredient'}
          onClose={closeAllModals}
          data={currentIngredient}
          isOrderModalOpen={false}
        />
      )}
      {data && (
        <Main>
          <BurgerIngredients
            openIngredientModal={openIngredientModal}
            data={data.data}
          />
          <BurgerConstructor data={data.data} openOrderModal={openOrderModal} />
        </Main>
      )}
    </>
  );
}

export default App;
