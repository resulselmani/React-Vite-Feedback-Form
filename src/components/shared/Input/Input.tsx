import React from "react";
import { InputProps } from "./types";
import { useFormContext } from "react-hook-form";

const Input = ({
  type,
  placeholder,
  required = false,
  className,
  register,
  validationSchema,
  name,
  errorMessage = "",
  min = 0,
  max = 0,
} : InputProps): JSX.Element => {
  return (
    <div>
      {type === "textarea" ? (
        <textarea
          className={className}
          placeholder={placeholder}
          {...register(name, validationSchema)}
        />
      ) : (
        <input
          type={type}
          required={required}
          placeholder={placeholder}
          className={className}
          {...register(name, validationSchema)}
          min={min}
          max={max}
        />
      )}
      {errorMessage && <p className="text-red-600">{`${errorMessage}`}</p>}
    </div>
  );
};
export default Input;
