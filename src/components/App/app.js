import React, { useState, useEffect, useCallback } from 'react';
import { Router, Route, useHistory, Switch } from 'react-router-dom';
import AppHeader from '../app-header/app-header.js';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { RESET_INGREDIENT_DATA } from '../../services/actions/ingredient-details';
import { LoginPage, RegisterPage } from '../../pages';
import Modal from '../modal/modal.js';

function App() {
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const history = useHistory();

  const { orderRequest } = useSelector(state => state.order);
  const { isInfoRequested } = useSelector(state => state.ingredientInfo);

  const dispatch = useDispatch();

  const closeAllModals = () => {
    if (isIngredientModalOpen) {
      setIsIngredientModalOpen(false);
      dispatch({
        type: RESET_INGREDIENT_DATA,
      });
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
    if (orderRequest) {
      openOrderModal();
    } else if (isInfoRequested) {
      openIngredientModal();
    }
  }, [orderRequest, openOrderModal, openIngredientModal, isInfoRequested]);

  return (
    <>
      <Router history={history} basename="/">
        <AppHeader />
        <Switch>
          <Route exact path="/">
            {isOrderModalOpen && (
              <Modal onClose={closeAllModals}>
                <OrderDetails isOrderModalOpen={isOrderModalOpen} />
              </Modal>
            )}
            {isIngredientModalOpen && (
              <Modal onClose={closeAllModals} isOrderModalOpen={false}>
                <IngredientDetails />
              </Modal>
            )}
            <Main>
              <BurgerIngredients />
              <BurgerConstructor />
            </Main>
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
