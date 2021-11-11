import React from "react";
import { ReactSVG } from "react-svg";
import { mergeClassName } from "lib/api/utils";
type IconsProps = {
  name: string;
  className?: string;
  style?: { [key: string]: any };
  onClick?: React.MouseEventHandler & React.MouseEventHandler<SVGSVGElement>;
  [key: string]: any;
};

const handleClassName = (className: string): string => {
  return mergeClassName(className, "svg-icon inline-block");
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
    // beforeInjection: (svg) => {
    //   svg.classList.add("svg-class-name");
    //   svg.setAttribute("style", "width: 200px");
    // }
  };

  return <ReactSVG {...svgParams} />;
};
export default Icons;
