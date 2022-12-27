import React from "react";
import { InputProps } from "./types";

const Input = ({
  type,
  placeholder,
  required = false,
  className,
  register,
  validationSchema,
  name,
  errorMessage = "",
  min,
  max,
}: InputProps): JSX.Element => {
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
          min={type === "number" && min}
          max={type === "number" && max}
        />
      )}
      {errorMessage && <p className="text-red-600">{`${errorMessage}`}</p>}
    </div>
  );
};
export default Input;
