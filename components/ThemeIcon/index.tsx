import React, { useState, memo } from "react";
import { useStore } from "framework7-react";
import Icons from "components/Icons";
import store from "lib/store";

type ThemeIconOptions = {
  dark?: boolean;
  onToggle?: () => void;
};
const ThemeIcon: React.FC<ThemeIconOptions> = () => {
  const darkStatus = useStore("dark");
  const [isDark, setIsDark] = useState(darkStatus);
  const [reomveThemeClass, setReomveThemeClass] = useState(false);
  const [timer, setTimer] = useState(null);

  const themeContainerClass = `${isDark ? "rw-theme-dark " : ""}`;
  const themeIconClass = "row-span-1-2 col-span-1-2";

  const themeMoonIcon = `${isDark ? "theme-hide " : "theme-active "}`;
  const themeMoonAnimation = `${reomveThemeClass ? "theme-moon " : ""}`;
  const themeMoon = `${themeMoonIcon}${themeMoonAnimation}${themeIconClass}`;

  const themeSunlightIcon = `${isDark ? "theme-active " : "theme-hide "}`;
  const themeSunlightAnimation = `${reomveThemeClass ? "theme-sunlight " : ""}`;
  const themeSunlight = `${themeSunlightIcon}${themeSunlightAnimation}${themeIconClass}`;

  const onThemeChange = () => {
    if (timer) return;

    setIsDark(!isDark);
    const _timer = setTimeout(() => {
      setReomveThemeClass(false);
      setTimer(null);
    }, 1000 * 1);

    setTimeout(() => {
      store.dispatch("setDark", !isDark);
    }, 1000 * 0.5);

    setTimer(_timer);
    setReomveThemeClass(true);
  };

  return (
    <div
      className={`${themeContainerClass}theme-container grid grid-cols-1 pl-4`}
      onClick={onThemeChange}
    >
      <Icons name="moon" className={`${themeMoon}`} />
      <Icons name="sunlight" className={`${themeSunlight}`} />
    </div>
  );
};

export default memo(ThemeIcon);
