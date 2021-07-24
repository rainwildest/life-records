import React from "react";
import { ReactSVG } from "react-svg";

type IconsProps = {
  name: string;
  className?: string;
  style?: { [key: string]: any };
  onClick?: React.MouseEventHandler & React.MouseEventHandler<SVGSVGElement>;
};

const handleClassName = (className: string): string => {
  const classBase = "svg-icon inline-block";
  const classNameSplit = className.split(" ");
  const classBaseSplit = classBase.split(" ");

  /* 去重 */
  const classNameArray = new Set([...classBaseSplit, ...classNameSplit]);
  return [...classNameArray].filter((name) => !!name).join(" ");
};

const Icons: React.FC<IconsProps> = ({
  name,
  className = "",
  style,
  onClick
}) => {
  let url = "";
  const base = "/svg/";

  switch (name) {
    case "moon":
      url = `${base}moon.svg`;
      break;
    case "sunlight":
      url = `${base}sunlight.svg`;
      break;
    case "notepad-01":
      url = `${base}notepad-01.svg`;
      break;
    case "notepad-02":
      url = `${base}notepad-02.svg`;
      break;
    case "statistics":
      url = `${base}statistics.svg`;
      break;
    case "mine":
      url = `${base}mine.svg`;
      break;
    case "cry":
      url = `${base}cry.svg`;
      break;
  }

  const svgParams = {
    style,
    onClick,
    src: url,
    className: handleClassName(className)
  };

  return <ReactSVG {...svgParams} />;
};
export default Icons;
