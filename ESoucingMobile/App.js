import React from 'react'
 import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home'
import LoginScreen from './Screens/Account/LoginScreen'
import SignUpScreen from './Screens/Account/SignUpScreen'
import ProductsScreen from './Screens/Product/ProductsScreen'
import AddProductScreen from './Screens/Product/AddProductScreen'
import EditProductScreen from './Screens/Product/EditProductScreen'
import AuctionManagementScreen from './Screens/AuctionManagement/AuctionManagementScreen'
import AddAuctionScreen from './Screens/AuctionManagement/AddAuctionScreen'
import BidManagementScreen from './Screens/BidManagement/BidManagementScreen'



const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="Home" component={Home} options={{title: 'Ana Sayfa',headerBackVisible: false}} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: 'Giriş Yap'}}/>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{title: 'Kayıt Ol'}}/>
            <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{title: 'Ürünler'}}/>
            <Stack.Screen name="AddProductScreen" component={AddProductScreen} options={{title: 'Ürün Ekle'}}/>
            <Stack.Screen name="EditProductScreen" component={EditProductScreen} options={{title: 'Ürün Düzenle'}}/>
            <Stack.Screen name="AuctionManagementScreen" component={AuctionManagementScreen} options={{title: 'İhale Yönetimi'}}/>
            <Stack.Screen name="AddAuctionScreen" component={AddAuctionScreen} options={{title: 'İhale Oluştur'}}/>
            <Stack.Screen name="BidManagementScreen" component={BidManagementScreen} options={{title: 'Teklif Yönetimi'}}/>
          </Stack.Navigator>
        </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App;