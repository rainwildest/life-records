import React, { useState, memo } from "react";
import Icons from "components/Icons";

type ThemeIconOptions = {
  dark?: boolean;
  onToggle?: () => void;
};
const ThemeIcon: React.FC<ThemeIconOptions> = ({ dark = false, onToggle }) => {
  const [reomveThemeClass, setReomveThemeClass] = useState(false);
  const [timer, setTimer] = useState(null);
  const onThemeChange = () => {
    if (timer) return;

    onToggle && onToggle();
    const _timer = setTimeout(() => {
      setReomveThemeClass(false);
      setTimer(null);
    }, 1000 * 1.8);

    setTimer(_timer);
    setReomveThemeClass(true);
  };
  const themeContainerClass = `${dark ? "rw-theme-dark " : ""}`;
  const themeIconClass = "row-span-1-2 col-span-1-2";

  const themeMoonIcon = `${dark ? "theme-hide " : "theme-active "}`;
  const themeMoonAnimation = `${reomveThemeClass ? "theme-moon " : ""}`;
  const themeMoon = `${themeMoonIcon}${themeMoonAnimation}${themeIconClass}`;

  const themeSunlightIcon = `${dark ? "theme-active " : "theme-hide "}`;
  const themeSunlightAnimation = `${reomveThemeClass ? "theme-sunlight " : ""}`;
  const themeSunlight = `${themeSunlightIcon}${themeSunlightAnimation}${themeIconClass}`;
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
