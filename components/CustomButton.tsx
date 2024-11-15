import {  Text, TouchableOpacity} from "react-native";
import React from "react";
import { ButtonProps } from "../types/type.d";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-[#999999]";
    case "tetra":
      return "bg-[#f4a261]";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#863ED5]";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton: React.FC<ButtonProps> = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "Default",
  IconLeft,
  IconRight,
  className,
  textStyle,
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`w-full py-2 rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
  
    {...props}
  >
    {IconLeft && <IconLeft />}
    <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant as ButtonProps["textVariant"])} `} style={textStyle}>
      {title}
    </Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
);


export default CustomButton;
