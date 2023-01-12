import { FormHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export type Props = {
  onSubmit: () => {};
  register: UseFormRegister<FieldValues>;
  validationSchema: any;
  errors: any;
};

export type FormProps = Props & FormHTMLAttributes<HTMLElement>;
