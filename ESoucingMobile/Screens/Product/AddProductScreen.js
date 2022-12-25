import React, { useState } from 'react'
import {Box,Input, Text,TextArea,Button, HStack } from "native-base"
import { ActivityIndicator, Alert, Image } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {AddProductsRequest} from '../../ApiConnection/ApiRequest/ProductRequest'


const AddProductScreen = ({navigation}) => {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile,setImageFile] = useState("");
    const [loading, setLoading] = useState(false);


    const SaveProduct =  async () => {

        if(imageFile == ""){
            Alert.alert("Hata","Lütfen Fotoğraf Çekiniz veya Seçiniz.")
            return;
        }
        await setLoading(true);
        let model = {
            "id": "",
            "name": name,
            "category": category,
            "summary": summary,
            "description": description,
            "imageFile": imageFile
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

        <Box m={2}>
            <Text mx="3" minW="20%">Ürün Açıklaması: </Text>
            <TextArea mx="3" backgroundColor="white" placeholder="Ürün Açıklaması" w="96%" value={description} onChangeText = {(val)=> { setDescription(val) }} />
        </Box>

        <Box alignItems="center" m="2">
            <HStack space={1}>
                <Button minW="45%" onPress={() => {launchCamera({maxWidth:320,maxHeight:160,includeBase64: true,quality: 0.5,mediaType:"photo"},(photo)=> {
                    setImageFile(photo.assets[0].base64);
                })}}>
                    Fotoğrak Çek
                </Button> 
                <Button minW="45%" onPress={() => {launchImageLibrary({maxWidth:320,maxHeight:160,includeBase64: true,quality: 0.5,mediaType:"photo"},(photo)=> {
                    setImageFile(photo.assets[0].base64);
                })}}>
                    Galeriden Seç
                </Button> 
            </HStack>
          
        </Box>
        <Box alignItems="center" m="2">
            {imageFile != "" &&
                <Image 
                    style={{width: 320, height: 160, resizeMode: "contain", borderWidth: 1, borderColor: 'red'}}
                    source={{uri: `data:image/jpeg;base64,${imageFile}`}} 
                    alt="image" 
                /> 
            }
        </Box>

        <Box alignItems="center" m="2">
           {!loading ? 
          <Button minW="95%" onPress={async () => {await SaveProduct()}}>
              Kaydet
          </Button> : <ActivityIndicator></ActivityIndicator> }
        </Box>
    </>
  )
}

export default AddProductScreen