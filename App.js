import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootStack from './src/navigations/RootStack';
import AsyncStorage from "@react-native-async-storage/async-storage"


const Stack = createNativeStackNavigator();

const backgroundMessages = [ 
  {
    _id: 6,
    text: 'Get well soon',
    createdAt: new Date(),
    user: {
      _id: 6,
      name: 'Tom',
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbnGOEQrCAjjYEWd5aQNuw47UxzYyN-ej03w&usqp=CAU",
    },
    image: '',
  },
  {
    _id: 5,
    text: 'I am sick',
    createdAt: new Date(),
    user: {
      _id: 5,
      name: 'Jack',
      avatar:
        "https://media.istockphoto.com/photos/office-manager-working-on-computer-at-his-desk-picture-id1053499704?k=20&m=1053499704&s=612x612&w=0&h=Cu2OybZHXqJ2-iVyPxSwG2CgB2ebSXxMYMFlZAtRlcU=",
    },
    image: '',
  },
  {
    _id: 4,
    text: 'can we play today?',
    createdAt: new Date(),
    user: {
      _id: 3,
      name: 'Emily',
      avatar:
        'https://media.istockphoto.com/photos/confident-woman-picture-id1163683003?b=1&k=20&m=1163683003&s=612x612&w=0&h=MtFZJ-FKQXWZWVT8STA-9nsm9eShUXjCLlJAqCQxEfg=',
    },
    image: '',
  },
]
export default function App() {
  useEffect(()=>{
      saveAsync()
  },[])
  const saveAsync = async()=>{
    await AsyncStorage.setItem('asyncMessages',JSON.stringify(backgroundMessages))
  }
  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  );
}
