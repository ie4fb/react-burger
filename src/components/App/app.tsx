import { useState, useEffect, useCallback } from 'react';
import {
  Router,
  Route,
  useHistory,
  Switch,
  useLocation,
} from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { RESET_INGREDIENT_DATA } from '../../services/actions/ingredient-details';
import { ProtectedRoute } from '../protected-route/protected-route';

import {
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  ProfilePage,
} from '../../pages';
import {
  RESET_ORDER_DETAILS,
  RESET_ORDER_DATA,
} from '../../services/actions/order';
import Modal from '../modal/modal';
import { orderData } from '../../utils/config';
import { getUser } from '../../services/actions/user';
import { RootState } from '../../services/reducers/';
import OrderInfo from '../order-info/order-info';
import { getOrdersFeed } from '../../services/actions/order';
import Feed from '../../pages/feed';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { getOrderFeedSuccessAction } from '../../services/actions/order';

function App() {
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isOrderInfoModalOpen, setIsOrderInfoModalOpen] = useState(false);
  const history = useHistory();
  const location = useLocation<{
    background: undefined;
  }>();

  const { wsData } = useSelector((store: RootState) => store.ws);

  const { orderSuccess } = useSelector((state: RootState) => state.order);
  const { isInfoRequested } = useSelector(
    (state: RootState) => state.ingredientInfo,
  );
  const { orderInfoRequested } = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch();

  const closeAllModals = () => {
    if (isIngredientModalOpen) {
      setIsIngredientModalOpen(false);
      dispatch({
        type: RESET_INGREDIENT_DATA,
      });
      history.push('/');
    } else if (isOrderModalOpen) {
      dispatch({
        type: RESET_ORDER_DETAILS,
      });
      setIsOrderModalOpen(false);
    } else {
      setIsOrderInfoModalOpen(false);
      dispatch({
        type: RESET_ORDER_DATA,
      });
      history.location.pathname.split('/')[1] === 'profile'
        ? history.push('/profile/orders')
        : history.push('/orders');
    }
  };

  useEffect(() => {
   // dispatch(getOrdersFeed());
    // dispatch({
    //   type: SET_ORDERS,
    //   orders: orderData,
    // });
    dispatch(getUser());
    dispatch(getIngredients());

  }, [dispatch]);

  useEffect(() => {
    if(wsData){
      dispatch(getOrderFeedSuccessAction(wsData))
    }
  }, [wsData, dispatch]);

  const openIngredientModal = useCallback(() => {
    setIsIngredientModalOpen(true);
  }, [setIsIngredientModalOpen]);

  const openOrderModal = useCallback(() => {
    setIsOrderModalOpen(true);
  }, [setIsOrderModalOpen]);

  useEffect(() => {
    if (orderSuccess) {
      openOrderModal();
    } else if (isInfoRequested) {
      openIngredientModal();
    } else if (orderInfoRequested) {
      setIsOrderInfoModalOpen(true);
    }
  }, [
    orderSuccess,
    openOrderModal,
    openIngredientModal,
    isInfoRequested,
    orderInfoRequested,
  ]);

  let background = location.state && location.state.background;

  useEffect(() => {
    history.replace({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router history={history}>
        <AppHeader />
        <Switch location={background || location}>
          <Route exact path="/">
            <Main>
              <BurgerIngredients />
              <BurgerConstructor />
              {isOrderModalOpen && (
                <Modal onClose={closeAllModals}>
                  <OrderDetails isOrderModalOpen={isOrderModalOpen} />
                </Modal>
              )}
            </Main>
          </Route>
          <Route exact path="/orders">
            <Feed />
          </Route>
          <Route exact path="/orders/:id">
            <OrderInfo />
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
          <>
            <Route path="/ingredients/:id">
              {isIngredientModalOpen && (
                <Modal onClose={closeAllModals}>
                  <IngredientDetails />
                </Modal>
              )}
            </Route>
            <ProtectedRoute path="/profile/orders/:id">
              {isOrderInfoModalOpen && (
                <Modal onClose={closeAllModals}>
                  <OrderInfo />
                </Modal>
              )}
            </ProtectedRoute>
            <Route path="/orders/:id">
              {isOrderInfoModalOpen && (
                <Modal onClose={closeAllModals}>
                  <OrderInfo />
                </Modal>
              )}
            </Route>
          </>
        )}
      </Router>
    </>
  );
}

export default App;
