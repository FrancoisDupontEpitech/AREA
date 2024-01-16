import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { clientTokenContext } from './Context';
import Login from './src/screens/Login';
import AddArea from './src/screens/AddArea';
import Register from './src/screens/Register';
import YourArea from './src/screens/YourArea';
import YourAREAListView from './src/screens/YourAREAListView';
import Service from './src/screens/Service';
import Profile from './src/screens/Profile';
import Connect from './src/screens/Connect';
import Dashboard_for_dev from './src/screens/Dashboard_for_dev';
import Action from './src/screens/Action';
import { AreaProvider } from './src/screens/AreaContext';


const Stack = createStackNavigator();

export default function App() {

  const [clientToken, setClientToken] = useState("")
  // add usestate here for conditional rendering of action or reaction pages depending on hwat button is clicked in createarea screen
  //const [re_action, setReAction] = useState("")

  return (
      <clientTokenContext.Provider value={{ clientToken, setClientToken }}>
        <AreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false}} >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="YourArea" component={YourArea} />
              <Stack.Screen name="AddArea" component={AddArea} />
              <Stack.Screen name="YourAREAListView" component={YourAREAListView} />
              <Stack.Screen name="Service" component={Service} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Connect" component={Connect} />
              <Stack.Screen name="Dashboard_for_dev" component={Dashboard_for_dev} />
              <Stack.Screen name="Action" component={Action} />
            </Stack.Navigator>
           </NavigationContainer>
        </AreaProvider>
      </clientTokenContext.Provider>
  );
};