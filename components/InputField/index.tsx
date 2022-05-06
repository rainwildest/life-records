import React, { memo, Fragment, HTMLInputTypeAttribute, MouseEventHandler } from "react";
import { Field } from "formik";
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
      {label && <div className="text-gray-700 font-bold text-sm mt-5 mb-3 pl-2">{label}</div>}
      <div
        className={`relative h-14 w-full ${value ? "pl-3" : "px-3"} shadow-3 rounded-lg text-gray-600 text-xs flex items-center`}
      >
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
    </Fragment>
  );
};

export default memo(InputField);
