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
  const base = "/svg/";
  const url = `${base}${name}.svg`;

  const svgParams = {
    style,
    onClick,
    src: url,
    className: handleClassName(className)
  };

  return <ReactSVG {...svgParams} />;
};
export default Icons;
