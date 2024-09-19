import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import TextInputList from '../global/TextInputList';

interface AppFormInputListProps {
  name: string;
  label: string;
  placeholder?: string;
  inputProps?: object;
  containerStyle?: object; 
  labelStyle?: object;
}

const AppFormFieldList: React.FC<AppFormInputListProps> = ({
  name,
  label,
  placeholder = "Enter text",
  inputProps,
  containerStyle,
  labelStyle,
}) => {
  type FormValues = { [key: string]: any };

  const { setFieldValue, values, errors, touched } = useFormikContext<FormValues>();

  const hasError = !!errors[name] && !!touched[name];
  const errorMessage = typeof errors[name] === 'string' ? errors[name] : undefined;

  return (
    <>
      <TextInputList
        label={label}
        values={values[name] || []}  // Pre-fill with Formik values
        onChangeValues={(updatedValues: string[]) => setFieldValue(name, updatedValues)} // Update Formik values
        placeholder={placeholder}
        {...inputProps}
      />
      {hasError && errorMessage ? (
        <Text className='text-red-500 text-[12px] mt-1'>{errorMessage}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({

});

export default AppFormFieldList;
