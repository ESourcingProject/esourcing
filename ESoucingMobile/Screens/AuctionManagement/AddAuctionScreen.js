import React, { useState } from 'react'
import {Box,Input, Text, Button } from "native-base"
import {AddAuctionsRequest} from '../../ApiConnection/ApiRequest/ActuionRequest'
import { ActivityIndicator, Alert } from 'react-native';

const AddAuctionScreen = ({navigation}) => {

    const [name, setName] = useState("");
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [loading, setLoading] = useState(false);


    const SaveAuction =  async () => {
        await setLoading(true);
        let model = {
            "id": "",
            "name": name,
            "product": product,
            "quantity": quantity,
            "minPrice": minPrice,
            "isCompleted": false,
            "createdUser": "63a74178d561f962bb8da334"
        }

        let result = await AddAuctionsRequest(model);

        try{
            if(result.id != ""){
                Alert.alert("Başarılı","Kayıt Etme işleminiz gerçekleşmiştir.", [
                    { text: "Tamam", onPress: () => navigation.navigate("AuctionManagementScreen") }
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
            <Input mx="3" backgroundColor="white" placeholder="Ürün" w="70%" value={product} onChangeText = {(val)=> { setProduct(val) }} />
        </Box>

        <Box alignItems="center" m={2} style={{flexDirection: "row"}}>
            <Text mx="3"  minW="20%">Adet: </Text>
            <Input mx="3" backgroundColor="white" placeholder="Adet" w="70%" value={quantity} onChangeText = {(val)=> { setQuantity(val) }}/>
        </Box>

        <Box alignItems="center" m={2} style={{flexDirection: "row"}}>
            <Text mx="3"  minW="20%">Min Fiyat: </Text>
            <Input mx="3" backgroundColor="white" placeholder="Başlangıç Fiyatı" w="70%" value={minPrice} onChangeText = {(val)=> { setMinPrice(val) }}/>
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