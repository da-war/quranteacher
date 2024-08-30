import { View, Text } from 'react-native';
import React from 'react';
import { AppFormFieldProps } from '@/types/type';
import InputField from '../InputField';
import { useFormikContext } from 'formik';

const AppFormField: React.FC<AppFormFieldProps> = ({ name, label,...otherProps }) => {
  type FormValues = { [key: string]: any };

  const { setFieldTouched, handleChange, errors, touched } = useFormikContext<FormValues>();

  const hasError = !!errors[name] && !!touched[name];
  const errorMessage = typeof errors[name] === 'string' ? errors[name] : undefined;

  return (
    <>
      <InputField
        label={label}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        containerStyle={hasError ? 'border-red-500' : 'border-neutral-100'}
        {...otherProps}
      />
      {hasError && errorMessage ? (
        <Text className="text-red-500 text-sm mt-1">{errorMessage}</Text>
      ) : null}
    </>
  );
};

export default AppFormField;
