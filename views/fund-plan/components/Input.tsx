import React, { useState, memo } from "react";
import Icons from "components/Icons";

type InputParam = {
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  placeholder?: string;
  onChange?: (e: string) => void;
  onClick?: (e: any) => void;
  readOnly?: boolean;
};
const Input: React.FC<InputParam> = ({
  type = "text",
  value = "",
  placeholder = "",
  readOnly = false,
  onChange,
  onClick
}) => {
  const onInput = (e) => {
    const _value = (e.target as HTMLInputElement).value;

    onChange && onChange(_value);
  };

  const onClear = () => {
    onChange && onChange("");
  };

  return (
    <div className="relative h-14 w-full px-3 shadow-3 rounded-lg text-gray-600 text-xs flex items-center">
      <input
        placeholder={placeholder}
        className="bg-transparent text-sm w-full"
        value={value}
        onInput={onInput}
        type={type}
        onClick={onClick}
        readOnly={readOnly}
      />

      {value && (
        <Icons name="close" className="field-clear px-2" onClick={onClear} />
      )}
    </div>
  );
};

export default memo(Input);
