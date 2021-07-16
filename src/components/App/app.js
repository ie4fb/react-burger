import React, { useState, useEffect, useCallback } from 'react';
import {
  Router,
  Route,
  useHistory,
  Switch,
  useLocation,
} from 'react-router-dom';
import AppHeader from '../app-header/app-header.js';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { RESET_INGREDIENT_DATA } from '../../services/actions/ingredient-details';
import { ProtectedRoute } from '../protected-route/protected-route.js';
import {
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  ProfilePage,
} from '../../pages';
import { SET_ORDERS } from '../../services/actions/order';
import Modal from '../modal/modal.js';
import { orderData } from '../../utils/config';
import { getUser } from '../../services/actions/user.js';

function App() {
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const { orderRequest } = useSelector(state => state.order);
  const { isInfoRequested } = useSelector(state => state.ingredientInfo);

  const dispatch = useDispatch();
  const { state } = useLocation();

  const closeAllModals = () => {
    if (isIngredientModalOpen) {
      setIsIngredientModalOpen(false);
      dispatch({
        type: RESET_INGREDIENT_DATA,
      });
      history.push('/');
    }
    setIsOrderModalOpen(false);
  };

  useEffect(() => {
    dispatch({
      type: SET_ORDERS,
      orders: orderData,
    });
    dispatch(getUser());
  }, [dispatch]);

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

  let background = location.state && location.state.background;

  useEffect(() => {
    console.log(background);
  }, [background]);
  useEffect(() => {
    history.replace({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router history={history} basename="/">
        <AppHeader />
        <Switch location={background || location}>
          <Route exact path="/">
            <Main>
              <BurgerIngredients />
              <BurgerConstructor />
              {isOrderModalOpen && (
                <Modal onClose={closeAllModals}>
                  <OrderDetails />
                </Modal>
              )}
            </Main>
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/reset-password">
            <ResetPasswordPage />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPasswordPage />
          </Route>
          <Route path="/ingredients/:id">
            <Main>
              <IngredientDetails />
            </Main>
          </Route>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
        </Switch>
        {background && (
          <Route path="/ingredients/:id">
            {isIngredientModalOpen && (
              <Modal onClose={closeAllModals}>
                <IngredientDetails />
              </Modal>
            )}
          </Route>
        )}
      </Router>
    </>
  );
}

export default App;
