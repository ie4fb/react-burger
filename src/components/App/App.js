import React from 'react';
import { Router, Route, useHistory, Switch } from 'react-router-dom';
import appStyles from './App.module.css';
import {
  Tab,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { data } from '../../config/config';

function App() {
  const [current, setCurrent] = React.useState('one');

  const history = useHistory();

  return (
    <Router history={history}>
      <div className={appStyles.page}>
        <AppHeader />
        <Switch>
          <Main>
            <Route exact path="/">
              <BurgerIngredients data={data} />
            </Route>
            <Route exact path="/orders">
              dsdsds
            </Route>
          </Main>
        </Switch>
      </div>
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
