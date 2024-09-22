import {  Text, View } from 'react-native'

import { useTeacherStore } from '@/store/useTeacherStore';


const TeacherProfile = () => {
  const {teacher}=useTeacherStore();


  console.log("Teacher",teacher?.name);

  return (
    <View>
      <Text>TeacherProfile</Text>
    </View>
  )
}

export default TeacherProfile
