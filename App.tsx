import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepage from './screens/Homepage';
import Loginpage from './screens/Loginpage';
import Profilescreen from './screens/Profilescreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{title: 'Home'}}
          component={Homepage}
        />
        <Stack.Screen
          name="Login"
          options={{title: 'Login'}}
          component={Loginpage}
        />
        <Stack.Screen
          name="Profile"
          options={{title: 'Profile'}}
          component={Profilescreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
