import React, { useState, memo, Fragment, HTMLInputTypeAttribute, MouseEventHandler } from "react";
import { Field, FormikProps } from "formik";
import Icons from "components/Icons";

type InputFieldProps = {
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

const InputField: React.FC<InputFieldProps> = ({
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
    <Fragment>
      <div className="text-gray-700 font-bold text-sm mt-5 mb-3 pl-2">{label}</div>
      <div
        className={`relative h-14 w-full ${value ? "pl-3" : "px-3"} shadow-3 rounded-lg text-gray-600 text-xs flex items-center`}
      >
        <Field
          className="bg-transparent text-sm w-full"
          readOnly={readOnly}
          autoComplete={autoComplete}
          placeholder={placeholder}
          name={name}
          type={type}
          onClick={onClick}
        />
        {value && (
          <Icons name="close" className="field-clear px-2 flex h-full w-11 items-center justify-center" onClick={onClearField} />
        )}
      </div>
    </Fragment>
  );
};

export default memo(InputField);
