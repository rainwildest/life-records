import React, { useState } from "react";
import Framework7 from "framework7/lite-bundle";
import Framework7React, { App as FrameworkApp } from "framework7-react";
import f7params from "lib/configure/f7params";
import store from "lib/store";
import event from "lib/api/framework-event";

Framework7.use(Framework7React);

const Framework7App: React.FC = ({ children }) => {
  const [themeDark, setThemeDark] = useState(false);

  event.on("theme-dark", (themeDark = false) => {
    setThemeDark(themeDark);

    themeDark && document.documentElement.classList.add("dark");
    !themeDark && document.documentElement.classList.remove("dark");
  });

  return (
    <FrameworkApp {...f7params} store={store} themeDark={themeDark}>
      {children}
    </FrameworkApp>
  );
};

export default Framework7App;
