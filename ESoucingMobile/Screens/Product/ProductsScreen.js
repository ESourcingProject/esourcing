import React, { useState, useEffect } from 'react'
import { ScrollView,Text } from 'react-native'
import {Button,Box} from 'native-base'
import {GetProductsRequest} from '../../ApiConnection/ApiRequest/ProductRequest'
import ProductItem from '../../Components/ProductItem'
const ProductsScreen = ({navigation}) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts = async () => {
      await setProducts(await GetProductsRequest())
    }
    fetchProducts();
  },[products]);

  return (
      <ScrollView>
        <Box alignItems="center" m="2">
          <Button minW="90%" color="black" backgroundColor="blueGray.400" onPress={() => {navigation.navigate('AddProductScreen')}}>
            <Text>Yeni Ürün Ekle</Text>
          </Button>
        </Box>
      {
          products.map((product) => {
            return  <ProductItem product={product} navigation={navigation}/>
        })
      }
      </ScrollView>
  )
}

export default ProductsScreen