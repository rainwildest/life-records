import React, { useState } from "react";
import Framework7 from "framework7/lite-bundle";
import Framework7React, { App as FrameworkApp } from "framework7-react";
import f7params from "lib/configure/f7params";
import store from "lib/store";
import frameworkEvent from "lib/api/framework-event";

Framework7.use(Framework7React);

const Test: React.FC = ({ children }) => {
  const [themeDark, setThemeDark] = useState(false);

  frameworkEvent.on("theme-dark", (themeDark = false) => {
    setThemeDark(themeDark);
  });

  return (
    <FrameworkApp {...f7params} store={store} themeDark={themeDark}>
      {children}
    </FrameworkApp>
  );
};

export default Test;
