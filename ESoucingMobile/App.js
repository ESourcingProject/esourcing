import React from 'react'
 import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home'
import LoginScreen from './Screens/Login/LoginScreen'
import ProductsScreen from './Screens/Product/ProductsScreen'
import AddProductScreen from './Screens/Product/AddProductScreen'
import EditProductScreen from './Screens/Product/EditProductScreen'



const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="Home" component={Home} options={{headerBackVisible: false}} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: 'Giriş Yap'}}/>
            <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{title: 'Ürünler'}}/>
            <Stack.Screen name="AddProductScreen" component={AddProductScreen} options={{title: 'Ürün Ekle'}}/>
            <Stack.Screen name="EditProductScreen" component={EditProductScreen} options={{title: 'Ürün Düzenle'}}/>
          </Stack.Navigator>
        </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App;