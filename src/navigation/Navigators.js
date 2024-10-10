import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import AddProduct from '../screens/AddProduct';
import Admin from '../screens/Admin';
import ProductDetail from '../screens/ProductDeatail';

const Stack = createNativeStackNavigator();

function Navigators() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Admin"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigators;
