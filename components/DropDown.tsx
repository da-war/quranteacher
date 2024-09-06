import { Text, View } from 'react-native'
import React, { useState } from 'react'

const DropDown = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <View>
        <Text>DropDown</Text>
    </View>
  )
}

export default DropDown

