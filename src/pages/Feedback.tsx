import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import FeedbackForm from '../components/FeedbackForm/FeedbackForm'

const Feedback = () => {
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
    <FeedbackForm onSubmit={handleSubmit(onSubmit)} register={register} validationSchema={validationSchema} errors={errors} />
  )
}

export default Feedback;