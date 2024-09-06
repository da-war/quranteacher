import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ayah from './Ayah';
import Surah from './Surah';

const Tab = createMaterialTopTabNavigator();

export default function TopNav() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor:"#7A4DB8",
        tabBarInactiveTintColor:"#999999",
        tabBarIndicatorStyle:{
            backgroundColor:"#7A4DB8",
        }
    }}>
      <Tab.Screen name="Ayah By Ayah" component={Ayah}  />
      <Tab.Screen name="Surah By Surah" component={Surah} />
    </Tab.Navigator>
  );
}