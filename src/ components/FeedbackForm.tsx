import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./shared/Input/Input";

const FeedbackForm = () => {
  const ratingValues = [1, 2, 3, 4, 5];
  const validationSchema = Yup.object({
    name: Yup.string()
      .required()
      .min(2, "Please enter a name with more than 2 characters"),
    email: Yup.string().email().required(),
    rating: Yup.number().required().oneOf(ratingValues),
    comment: Yup.string().nullable(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const inputClassnames = "p-4 my-2 border w-full rounded-lg";

  const downloadData = (data: any, fileName: any) => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data));
    var downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${fileName}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const onSubmit = (data: any) => {
    downloadData(data, Date.now());
    reset();
  };

  return (
    <div>
      <form
        className="flex flex-col w-3/4 mx-auto px-2 my-4 border"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type={"text"}
          placeholder={"name"}
          required={true}
          className={inputClassnames}
          register={register}
          validationSchema={validationSchema}
          name={"name"}
          errorMessage={errors.name?.message && `${errors.name?.message}`}
        />
        <Input
          type={"email"}
          placeholder={"email"}
          required={true}
          className={inputClassnames}
          register={register}
          validationSchema={validationSchema}
          name={"email"}
          errorMessage={errors.email?.message && `${errors.email?.message}`}
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
          errorMessage={errors.rating?.message && `${errors.rating?.message}`}
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
          type="submit"
          className="bg-gray-800 p-2 w-32 my-4 mx-auto text-white rounded-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
