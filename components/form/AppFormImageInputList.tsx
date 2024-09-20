import React from 'react';
import { Text } from 'react-native';
import { useFormikContext } from 'formik';
import ImageInputList from '../global/ImageInputList';

interface AppFormImageInputListProps {
  name: string;
  limit?: number;
  className?: string;
}

const AppFormImageInputList: React.FC<AppFormImageInputListProps> = ({ name, limit = 3, className }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext<{ [key: string]: any }>();

  const hasError = !!errors[name] && !!touched[name];
  const errorMessage = typeof errors[name] === 'string' ? errors[name] : undefined;

  const handleImagesPicked = (uris: string[]) => {
    setFieldValue(name, uris);
  };

  return (
    <>
      <ImageInputList
        onImagesPicked={handleImagesPicked}
        limit={limit}
        className={className}
      />
      {hasError && errorMessage && (
        <Text className="text-red-500 text-[12px] mt-1">{errorMessage}</Text>
      )}
    </>
  );
};

export default AppFormImageInputList;
