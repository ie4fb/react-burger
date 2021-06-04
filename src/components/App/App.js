import React, { useState } from 'react';
import { Router, Route, useHistory, Switch } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import useApi from '../../hooks/useApi';

import Modal from '../modal/modal.js';

function App() {
  const history = useHistory();
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

  const openIngredientModal = (data) => {
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
    <Router history={history}>
      <AppHeader />
      {isOrderModalOpen && <Modal type={'order'} onClose={closeAllModals} isOrderModalOpen={isOrderModalOpen}/>}
      {isIngredientModalOpen && currentIngredient && (
        <Modal
          type={'ingredient'}
          onClose={closeAllModals}
          data={currentIngredient}
          isOrderModalOpen={false}
        />
      )}
      {data && (
        <Switch>
          <Main>
            <Route exact path="/">
              <BurgerIngredients
                openIngredientModal={openIngredientModal}
                data={data.data}
              />
              <BurgerConstructor data={data.data} openOrderModal={openOrderModal}/>
            </Route>
            <Route exact path="/orders">
              dsdsds
            </Route>
          </Main>
        </Switch>
      )}
    </Router>
  );
}

export default App;

// eslint-disable-next-line no-lone-blocks
{
  /* <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '60%', listStyle: 'none', marginLeft: '150px', maxHeight: '60vh', overflowY: 'scroll', position: 'relative'}}>
        {data.map((item, index) => (
          <li style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '80px', width: '100%', top: (index === 0) ? '0' : 'unset', bottom: (index === (data.length - 1)) ? '0' : 'unset', position: (index === 0 || index === (data.length - 1)) ? 'fixed' : 'relative'}}>
            {(index !== 0 && index !== (data.length - 1)) && <div style={{position: 'absolute', top: '30px', left: '-30px'}}><DragIcon type="primary" /> </div>}
            <ConstructorElement
              type={(index === 0) ? "top" : index === (data.length - 1) ? "bottom" : undefined}
              isLocked={(index === 0 || index === (data.length - 1)) ? true : false}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              children={'asaasa'}
            ></ConstructorElement>
          </li>
        ))}
      </ul> */
}
