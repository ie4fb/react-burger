import appHeaderStyles from './app-header.module.css';
import Link from '../link/link';
const {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} = require('@ya.praktikum/react-developer-burger-ui-components');

function AppHeader() {

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
            Icon={BurgerIcon}
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
            Icon={ListIcon}
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
          Icon={ProfileIcon}
          textSize="default"
        >
          Личный кабинет
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;
