import React, { useState, memo } from "react";
import Icons from "components/Icons";

type FieldOptions = {
  label?: string;
  required?: boolean;
  clear?: boolean;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  onInput?: (value: string) => void;
  onVerify?: (value: boolean) => void;
};
const Field: React.FC<FieldOptions> = ({
  label,
  clear,
  required,
  type = "text",
  placeholder
}) => {
  const [verify, setVerify] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setVaule] = useState("");

  return (
    <div className="flex items-center py-1 mb-5">
      <div className="flex-shrink-0 h-10 text-gray-800 flex items-center bg-gray-200 px-4 py-2 rounded text-xs mr-2">
        {label || ""}
      </div>
      <div className="relative bg-gray-200 text-gray-600 h-10 rounded w-full text-xs flex items-center">
        <input
          className={`text-right w-full h-full${
            clear && !!value ? " !pl-3" : " !px-3"
          }`}
          value={value}
          type={type}
          placeholder={placeholder}
          onInput={(e) => {
            const value = (e.target as HTMLInputElement).value;
            setVaule(value);
          }}
        />

        {clear && !!value && (
          <Icons
            name="close"
            className="field-clear px-2"
            onClick={() => {
              setVaule("");
            }}
          />
        )}

        {verify && required && (
          <div className="error-message absolute top-10 left-1 break-all transform scale-90">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Field);