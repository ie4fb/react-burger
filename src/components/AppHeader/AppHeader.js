import React from "react";
import appHeaderStyles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  console.log(Logo);
  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.header__wrapper}>
        <nav className={appHeaderStyles.header__buttons}>
          <Button type="secondary" size="medium">
            <BurgerIcon type="primary" />
            <span className={appHeaderStyles.header__text}>Конструктор</span>
          </Button>
          <Button type="secondary" size="medium">
            <ListIcon type="primary" />
            <span className={appHeaderStyles.header__text}>Лента заказов</span>
          </Button>
        </nav>
        <div className={appHeaderStyles.header__logo}>
          <Logo />
        </div>
        <Button type="secondary" size="medium">
          <ProfileIcon type="primary" />
          <span className={appHeaderStyles.header__text}>Личный кабинет</span>
        </Button>
      </div>
    </header>
  );
}

export default AppHeader;
