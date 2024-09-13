import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { InputFieldProps } from "../types/type.d";

  import {MaterialCommunityIcons} from '@expo/vector-icons'
  
  const InputField: React.FC<InputFieldProps> = ({
    label,
    labelStyle,
    icon,
    secureTextEntry = false,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    autoCapitalize = "none",
  
    ...props
  }) => {
    const [password,setPassword]=useState(secureTextEntry)
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="my-1 w-full">
            <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
              {label}
            </Text>
            <View
              className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-2xl border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
            >
              {icon && (
                <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
              )}
              <TextInput
                className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
                secureTextEntry={password}
                autoCapitalize="none"
                autoCorrect={false}
                {...props}
              />
                {secureTextEntry?(<TouchableOpacity className="mr-3" onPress={()=>setPassword(!password)}>
                  {/* show eye hidden and hide show icon */}
                  <MaterialCommunityIcons name={password?"eye":'eye-off'} size={20} color='#4E2999'  />
                  
                </TouchableOpacity>):null}
        
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };
  
  export default InputField;
  