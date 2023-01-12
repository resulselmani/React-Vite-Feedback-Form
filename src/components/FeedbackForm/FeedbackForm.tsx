import React from "react";
import * as Yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../shared/Input/Input";
import { FormProps } from "./types";

const FeedbackForm = ({
  onSubmit,
  register,
  validationSchema,
  errors
}: FormProps) => {
  const inputClassnames = "p-4 my-4 border border-form-bg w-full rounded-lg";

  return (
      <form
        data-testid="form"
        className="flex flex-col w-3/4 md:w-1/2 bg-white rounded-md drop-shadow-xl mx-auto px-4 my-4 border"
        action=""
        onSubmit={onSubmit}
      >
        <Input
          type={"text"}
          placeholder={"name"}
          required={true}
          className={inputClassnames}
          register={register}
          validationSchema={validationSchema}
          name={"name"}
          errorMessage={errors?.name?.message && `${errors.name?.message}`}
        />
        <Input
          type={"email"}
          placeholder={"email"}
          required={true}
          className={inputClassnames}
          register={register}
          validationSchema={validationSchema}
          name={"email"}
          errorMessage={errors?.email?.message && `${errors.email?.message}`}
        />
        <Input
          type={"number"}
          placeholder={"rating"}
          required={true}
          min={1}
          max={5}
          className={inputClassnames}
          register={register}
          name={"rating"}
          validationSchema={validationSchema}
          errorMessage={errors?.rating?.message && `${errors.rating?.message}`}
        />
        <Input
          type={"textarea"}
          placeholder={"comment"}
          required={false}
          className={inputClassnames}
          register={register}
          validationSchema={validationSchema}
          name={"comment"}
        />
        <button
          data-testid="submit-button"
          type="submit"
          className="bg-gray-800 p-2 w-32 my-4 mx-auto text-white rounded-sm"
        >
          Submit
        </button>
      </form>
  );
};

export default FeedbackForm;
