import React from "react";
import appStyles from "./App.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../AppHeader/AppHeader";

function App() {
  const [current, setCurrent] = React.useState("one");

  return (
    <div className={appStyles.page}>
      <AppHeader />
      <div style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          One
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Three
        </Tab>
      </div>
    </div>
  );
}

export default App;
