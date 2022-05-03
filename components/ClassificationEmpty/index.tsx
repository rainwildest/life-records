import React from "react";
import { mergeClassName } from "lib/apis/utils";

type ClassificationEmptyProps = {
  className?: string;
  text?: string;
  src?: string;
};

const ClassificationEmpty: React.FC<ClassificationEmptyProps> = ({
  className = "",
  text = "",
  src = "/images/menhera-08.webp"
}) => {
  const $className = mergeClassName(className, "flex flex-col items-center");
  return (
    <div className={$className}>
      <img className="w-44 h-44 object-contain" src={src} />
      <div className="text-xs text-gray-500">{text}</div>
    </div>
  );
};

export default ClassificationEmpty;
