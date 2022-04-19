import React from "react";

type ClassificationEmptyProps = {
  text?: string;
};

const ClassificationEmpty: React.FC<ClassificationEmptyProps> = ({ text = "" }) => {
  return (
    <div className="flex flex-col items-center">
      <img className="w-44 h-44 object-contain" src="/images/menhera-08.webp" />
      <div className="text-xs text-gray-500">{text}</div>
    </div>
  );
};

export default ClassificationEmpty;
