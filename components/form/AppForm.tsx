import React from "react";

import { Formik } from "formik";
import { AppFormProps } from "@/types/type";

const AppForm:React.FC<AppFormProps> = ({ initialValues,validationSchema,onSubmit,children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;