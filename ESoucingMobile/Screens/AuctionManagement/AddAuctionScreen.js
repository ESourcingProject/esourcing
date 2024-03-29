import React, { useState,useEffect } from 'react'
import { ActivityIndicator, Alert } from 'react-native';
import {Box,Input, Text, Button, Select } from "native-base"
import {AddAuctionsRequest} from '../../ApiConnection/ApiRequest/ActuionRequest'
import {GetProductsRequest} from '../../ApiConnection/ApiRequest/ProductRequest'

const AddAuctionScreen = ({route,navigation}) => {
    const { userId } = route.params;
    const [name, setName] = useState("");
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [products,setProducts] = useState([]);

    useEffect(() => {
        fetchProducts = async () => {
          await setProducts(await GetProductsRequest())
        }
        fetchProducts();
      },[products]);


    const SaveAuction =  async () => {
        await setLoading(true);
        let model = {
            "id": "",
            "name": name,
            "product": product,
            "quantity": quantity,
            "minPrice": minPrice,
            "isCompleted": false,
            "createdUser": userId
        }

        let result = await AddAuctionsRequest(model);

        try{
            if(result.id != ""){
                Alert.alert("Başarılı","Kayıt Etme işleminiz gerçekleşmiştir.", [
                    { text: "Tamam", onPress: () => navigation.navigate("AuctionManagementScreen", {userId : userId}) }
                  ])
            }
        }catch{
            Alert.alert("Hata","Beklenmedik bir hata ile karşılaşıldı.")
        }finally{
             await setLoading(false);
        }
    }
    
  return (
    <>
        <Box alignItems="center" m={2} style={{flexDirection: "row"}}>
            <Text mx="3"  minW="20%">İhale Adı: </Text>
            <Input mx="3" backgroundColor="white" placeholder="İhale Adı" w="70%" value={name} onChangeText = {(val)=> { setName(val) }}/>
        </Box>

        <Box alignItems="center" m={2} style={{flexDirection: "row"}}>
            <Text mx="3"  minW="20%">Ürün: </Text>
            <Select selectedValue={product} mx="3" backgroundColor="white"  minWidth="75%" accessibilityLabel="Ürün Seçiniz" placeholder="Ürün Seçiniz" _selectedItem={{
                bg: "teal.600"
            }} mt={1} onValueChange={val => setProduct(val)}>
                { products.map((product) => {
                    return <Select.Item label={product.name} value={product.id} />  })
                }
            </Select>
        </Box>

        <Box alignItems="center" m={2} style={{flexDirection: "row"}}>
            <Text mx="3"  minW="20%">Adet: </Text>
            <Input mx="3" backgroundColor="white" placeholder="Adet" w="70%" value={quantity} keyboardType="numeric" onChangeText = {(val)=> { setQuantity(val) }}/>
        </Box>

        <Box alignItems="center" m={2} style={{flexDirection: "row"}}>
            <Text mx="3"  minW="20%">Min Fiyat: </Text>
            <Input mx="3" backgroundColor="white" placeholder="Başlangıç Fiyatı" w="70%" value={minPrice} keyboardType="numeric" onChangeText = {(val)=> { setMinPrice(val) }}/>
        </Box>

        <Box alignItems="center" m="2">
           {!loading ? 
          <Button minW="95%" onPress={async () => {await SaveAuction()}}>
            Kaydet
          </Button> : <ActivityIndicator></ActivityIndicator> }
        </Box>
    </>
  )
}

export default AddAuctionScreen