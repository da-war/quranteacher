import React from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';
import { useFormikContext } from 'formik';
import RadioButton from '../RadioButton';
import { AppFormRadioButtonProps } from '../../types/type.d'; // Define this type accordingly

const AppFormRadioButton: React.FC<AppFormRadioButtonProps> = ({
  name,
  title: label,
  options,
  selectedValue,
  onChange,
  style,
  ...otherProps
}) => {
  type FormValues = { [key: string]: any };

  const { setFieldValue, errors, touched, values } = useFormikContext<FormValues>();

  const hasError = !!errors[name] && !!touched[name];
  const errorMessage = typeof errors[name] === 'string' ? errors[name] : undefined;

  const errorStyle: ViewStyle = hasError ? styles.errorBorder : styles.defaultBorder;

  return (
    <>
      <RadioButton
        title={label}
        options={options}
        selectedValue={values[name]}
        onChange={item => setFieldValue(name, item)}
        style={[style, errorStyle]} // Combine styles
        {...otherProps}
      />
      {hasError && errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  errorBorder: {
    borderColor: 'red',
    borderWidth: 1,
  },
  defaultBorder: {
    borderColor: 'transparent', // Adjust the default border styling
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default AppFormRadioButton;
