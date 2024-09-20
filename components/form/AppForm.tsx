import React from "react";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { AppFormProps } from "../../types/type.d";

const AppForm = <T extends FormikValues>({ initialValues, validationSchema, onSubmit, children }: AppFormProps<T>) => {
  return (
    <Formik<T>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: T, helpers: FormikHelpers<T>) => onSubmit(values)}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
