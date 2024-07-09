import React from 'react';
import {Products} from './src/screen/Products/Products';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from './src/screen/Detail/Detail';
import StartScreen from './src/screen/auth/StartScreen';
import LoginScreen from './src/screen/auth/LoginScreen';
import { Provider } from 'react-redux';
import store from './src/screen/auth/store';
import RegisterScreen from './src/screen/auth/RegisterScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Start' component={StartScreen}></Stack.Screen>
        <Stack.Screen name='LoginPage' component={LoginScreen}></Stack.Screen>
        <Stack.Screen name='RegisterPage' component={RegisterScreen}></Stack.Screen>
        <Stack.Screen 
          name="ProductsPage"
          component={Products} 
          options={{
            title: 'Ürünler',
            headerStyle: {backgroundColor: '#64b5f6'},
            headerTitleStyle: {color: 'white'},
          }}></Stack.Screen>
        <Stack.Screen name="DetailPage" component={Detail} options={{
            title: 'Ürün Detayı',
            headerStyle: {backgroundColor: '#64b5f6'},
            headerTitleStyle: {color: 'white'}}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
