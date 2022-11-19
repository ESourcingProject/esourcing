import React, { useState } from 'react'
import {Box,Input, Text,TextArea,Button } from "native-base"
import {AddProductsRequest} from '../../ApiConnection/ApiRequest/ProductRequest'
import { ActivityIndicator, Alert } from 'react-native';

const AddProductScreen = ({navigation}) => {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [summary, setSummary] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);


    const SaveProduct =  async () => {
        await setLoading(true);
        let model = {
            "id": "",
            "name": name,
            "category": category,
            "summary": summary,
            "description": description,
            "imageFile": "",
            "price": price
        }

        let result = await AddProductsRequest(model);

        try{
            if(result.id != ""){
                Alert.alert("Başarılı","Kayıt Etme işleminiz gerçekleşmiştir.", [
                    { text: "Tamam", onPress: () => navigation.navigate("ProductsScreen") }
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
            <Text mx="3"  minW="20%">Ürün Adı: </Text>
            <Input mx="3" backgroundColor="white" placeholder="Ürün Adı" w="70%" value={name} onChangeText = {(val)=> { setName(val) }}/>
        </Box>

        <Box alignItems="center" m={2} style={{flexDirection: "row"}}>
            <Text mx="3"  minW="20%">Kategori: </Text>
            <Input mx="3" backgroundColor="white" placeholder="Kategori" w="70%" value={category} onChangeText = {(val)=> { setCategory(val) }} />
        </Box>

        <Box alignItems="center" m={2} style={{flexDirection: "row"}}>
            <Text mx="3"  minW="20%">Ürün Özeti: </Text>
            <Input mx="3" backgroundColor="white" placeholder="Ürün Özeti" w="70%" value={summary} onChangeText = {(val)=> { setSummary(val) }}/>
        </Box>

        <Box alignItems="center" m={2} style={{flexDirection: "row"}}>
            <Text mx="3" minW="20%">Ürün Fiyatı: </Text>
            <Input mx="3" keyboardType="numeric" backgroundColor="white" placeholder="Ürün Fiyatı" w="70%" value={price} onChangeText = {(val)=> { setPrice(val) }} />
        </Box>

        <Box m={2}>
            <Text mx="3" minW="20%">Ürün Açıklaması: </Text>
            <TextArea mx="3" backgroundColor="white" placeholder="Ürün Fiyatı" w="96%" value={description} onChangeText = {(val)=> { setDescription(val) }} />
        </Box>

        <Box alignItems="center" m="2">
           {!loading ? 
          <Button minW="95%" color="black" backgroundColor="blueGray.400" onPress={async () => {await SaveProduct()}}>
            <Text>Kaydet</Text>
          </Button> : <ActivityIndicator></ActivityIndicator> }
        </Box>
    </>
  )
}

export default AddProductScreen