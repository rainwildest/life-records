import React, { memo, HTMLInputTypeAttribute, MouseEventHandler } from "react";
import { Icons } from "components";
import { Field } from "formik";

type LoginFieldProps = {
  value: any;
  icon?: string;
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
  icon = "",
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
    <div className="relative bg-gray-200 flex items-center py-3 mb-4 text-gray-600 rounded w-full text-xs pl-2.5">
      {icon && <Icons name={icon} className="field-clear svg-icon-20 pr-2.5" />}
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
  );
};

export default memo(LoginField);
