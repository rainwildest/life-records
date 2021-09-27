import React from "react";
import ReactEcharts from "echarts-for-react";
import { mergeClassName } from "lib/api/utils";

type EchartsOptions = {
  option: any;
  renderer?: "svg" | "canvas";
  className?: string;
  style?: React.CSSProperties;
};

const Echarts: React.FC<EchartsOptions> = ({
  option,
  renderer = "svg",
  className,
  style = { width: "calc(100vw - 2rem)", height: "18.75rem" }
}) => {
  return (
    <ReactEcharts
      className={mergeClassName(className)}
      opts={{ renderer, width: "auto" }}
      style={style}
      option={option}
    />
  );
};

export default Echarts;
