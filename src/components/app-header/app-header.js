import appHeaderStyles from './app-header.module.css';
import Link from '../link/link';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  const history = useHistory();
  const {state} = useLocation();

  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.header__wrapper}>
        <nav className={appHeaderStyles.header__buttons}>
          <Link
            destination={'/'}
            spy={true}
            type={'header_constructor'}
            styleAdditional={'mr-2 p-5 mt-4 mb-4'}
            styleInactive={'text_color_inactive'}
            icon={BurgerIcon}
            textSize="default"
          >
            Конструктор
          </Link>
          <Link
            destination={'/orders'}
            spy={true}
            type={'header_orders'}
            styleAdditional={'p-5 mt-4 mb-4'}
            styleInactive={'text_color_inactive'}
            icon={ListIcon}
            textSize="default"
          >
            Лента заказов
          </Link>
        </nav>
        <div className={appHeaderStyles.header__logo}>
          <Logo />
        </div>
        <Link
          destination={'/profile'}
          spy={true}
          type={'header_account'}
          styleAdditional={'p-5 mt-4 mb-4'}
          styleInactive={'text_color_inactive'}
          icon={ProfileIcon}
          textSize="default"
        >
          Личный кабинет
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;
