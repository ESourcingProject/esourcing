// import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Box, Heading, AspectRatio, Image, Text, HStack, Stack, Pressable } from "native-base";
import { Alert, TouchableOpacity } from 'react-native';
import {DeleteProductsRequest} from '../ApiConnection/ApiRequest/ProductRequest'



const ProductItem = ({navigation,product}) => {

    const EditDeleteModalOpen = async (id,name) => { 
        Alert.alert(name, name + " Adlı Ürün Üzerinde Değişiklik Yapılıcak",
            [
                { text: "İptal", style: "cancel"  },
                { text: "Sil", onPress: async () => await DeleteProductsRequest(id)},
                { text: "Düzenle", onPress: () => navigation.navigate('EditProductScreen',{id : product.id}) }
            ]
        )
    }

    return (
        <TouchableOpacity onLongPress={async () => {await EditDeleteModalOpen(product.id,product.name)}} key={product.id}>
            <Box alignItems="center" >
            <Box  minW="full" maxW="full" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
                <Stack p="4" space={3}>
                <Stack space={2}>
                    <Heading size="md" ml="-1">
                    {product.name}
                    </Heading>
                    <Text fontSize="xs" _light={{
                    color: "violet.500"
                }} _dark={{
                    color: "violet.400"
                }} fontWeight="500" ml="-0.5" mt="-1">
                    {product.summary}
                    </Text>
                </Stack>
                    <AspectRatio w="100%" ratio={16 / 9}>
                        <Image source={{
                        uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                    }} alt="image" />
                    </AspectRatio>
                <Text fontWeight="400">
                    {product.description}
                </Text>

                </Stack>
            </Box>
            </Box>
        </TouchableOpacity>
    )
}

export default ProductItem

// const styles = StyleSheet.create({
//     main : {
//         flex:1,
//         backgroundColor: "white",
//         borderWidth: 2,
//         borderColor: "gray",
//         borderRadius: 5,
//         color:"black"
//     },
//     header : {
//         flex:1,
//         backgroundColor: "white",
//         borderBottomWidth: 2,
//         borderColor: "blue",
//         borderRadius: 5,
//         alignItems:"center",
//     },
//     headerText : {
//         fontSize:25,
//         color:"black"
//     },
//     body : {
//         flex:1,
//         backgroundColor: "white",
//         paddingLeft: 10
//     },

// })