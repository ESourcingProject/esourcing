import React, { useState,useEffect } from 'react'
import {Box,Input, Text,TextArea,Button } from "native-base"
import { GetProductByIdRequest,EditProductsRequest } from '../../ApiConnection/ApiRequest/ProductRequest'
import { ActivityIndicator, Alert } from 'react-native';

const EditProductScreen = ({navigation,route}) => {

    const id = route.params.id;
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProduct = async () => {
          let product = await GetProductByIdRequest(id)
          await setName(product.name)
          await setCategory(product.category)
          await setSummary(product.summary)
          await setDescription(product.description)
        }
        fetchProduct();
      },[]);

      const EditProduct =  async () => {
        await setLoading(true);
        let model = {
            "id": id,
            "name": name,
            "category": category,
            "summary": summary,
            "description": description,
            "imageFile": ""
        }
        let result = await EditProductsRequest(model);
        try{
            if(result){
                Alert.alert("Başarılı","Düzenleme işleminiz gerçekleşmiştir.", [
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

        <Box m={2}>
            <Text mx="3" minW="20%">Ürün Açıklaması: </Text>
            <TextArea mx="3" backgroundColor="white" placeholder="Ürün Açıklaması" w="96%" value={description} onChangeText = {(val)=> { setDescription(val) }} />
        </Box>

        <Box alignItems="center" m="2">
           {!loading ? 
          <Button minW="95%" color="black" backgroundColor="blueGray.400" onPress={async () => {await EditProduct()}}>
            <Text>Güncelle</Text>
          </Button> : <ActivityIndicator></ActivityIndicator> }
        </Box>
    </>
  )
}

export default EditProductScreen