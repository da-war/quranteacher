import React from 'react';
import { Text } from 'react-native';
import { useFormikContext } from 'formik';
import ImageInput from '../global/ImageInput';

interface AppFormImageInputProps {
  name: string;
  className?: string;
}

const AppFormImageInput: React.FC<AppFormImageInputProps> = ({ name, className }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext<{ [key: string]: any }>();

  const hasError = !!errors[name] && !!touched[name];
  const errorMessage = typeof errors[name] === 'string' ? errors[name] : undefined;

  const handleImagePicked = (uri: string) => {
    setFieldValue(name, uri);
  };

  return (
    <>
      <ImageInput
        onImagePicked={handleImagePicked}
        className={className}
      />
      {hasError && errorMessage && (
        <Text className="text-red-500 text-[12px] mt-1">{errorMessage}</Text>
      )}
    </>
  );
};

export default AppFormImageInput;
