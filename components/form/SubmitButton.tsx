import React from "react";

import { useFormikContext } from "formik";
import CustomButton from "../CustomButton";
import { SubmitButtonProps } from "@/types/type";

const SubmitButton: React.FC<SubmitButtonProps> = ({
    title,
    ...otherProps
}) => {
  const { handleSubmit } = useFormikContext();
  return (
    <CustomButton title={title} onPress={()=>handleSubmit()} {...otherProps}  />
  );
};

export default SubmitButton;