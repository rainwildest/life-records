import React, { memo, HTMLInputTypeAttribute, MouseEventHandler } from "react";
import { Icons } from "components";
import { Field } from "formik";

type LoginFieldProps = {
  value: any;
  name: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  readOnly?: boolean;
  placeholder?: string;
  autoComplete?: "off" | "on";
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const LoginField: React.FC<LoginFieldProps> = ({
  name,
  value,
  type = "text",
  label = "",
  readOnly = false,
  placeholder = "",
  autoComplete = "on",
  setFieldValue,
  onClick = null
}) => {
  const onClearField = () => {
    setFieldValue && setFieldValue(name, "");
  };

  return (
    <div className="flex items-center py-1 mb-5">
      <div className="flex-shrink-0 h-10 text-gray-800 flex items-center bg-gray-200 px-4 py-2 rounded text-xs mr-2">
        {label || ""}
      </div>
      <div className="relative bg-gray-200 text-gray-600 h-10 rounded w-full text-xs flex items-center">
        {/* <input
          className={`text-right w-full h-full${clear && !!inputValue ? " !pl-3" : " !px-3"}`}
          value={inputValue}
          type={type}
          placeholder={placeholder}
          onInput={(e) => {
            const value = (e.target as HTMLInputElement).value;
            onInput && onInput(value);
            setInputVaule(value);
          }}
        /> */}
        <Field
          className="bg-transparent text-sm w-full h-full"
          readOnly={readOnly}
          autoComplete={autoComplete}
          placeholder={placeholder}
          name={name}
          type={type}
          onClick={onClick}
        />

        {value && (
          <div className="h-full px-2 w-11 flex items-center justify-center flex-shrink-0" onClick={onClearField}>
            <Icons name="close" className="field-clear svg-icon-15" />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(LoginField);
