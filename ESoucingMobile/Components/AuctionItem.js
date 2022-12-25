import React, { useState } from 'react'
import { Input, Text, Button, Box, HStack, VStack, Spacer } from "native-base";
import { ActivityIndicator, Alert } from 'react-native';
import { AddBidsRequest } from '../ApiConnection/ApiRequest/BidRequest'

const AuctionItem = ({item,userId}) => {

    const [bidValue,setBidValue] = useState("");
    const [loading, setLoading] = useState(false);

    const SaveBid =  async () => {
        await setLoading(true);

        if(parseFloat(item.lastBid ?? item.minPrice) >= parseFloat(bidValue))
        {
            Alert.alert("Hata","Verilmek İstenen Teklif Güncel veya Minimum Tekliften Yüksek Olmalıdır.")
            await setBidValue("");
            await setLoading(false);
            return;
        }

        let model = {
            "id": "",
            "auction": item.id,
            "bidderUser": userId,
            "price": bidValue,
            "statu": 1
        }

        let result = await AddBidsRequest(model);

        try{
            if(result.id != ""){
                Alert.alert("Başarılı","Teklif Verme işleminiz gerçekleşmiştir.", [
                    { text: "Tamam" }
                  ])
            }
        }catch{
            Alert.alert("Hata","Beklenmedik bir hata ile karşılaşıldı.")
        }finally{
             await setLoading(false);
             await setBidValue("");
        }
    }

    return (
        <Box borderBottomWidth="1" _dark={{
            borderColor: "muted.50"
            }} borderColor="muted.800" pl={["2", "4"]} pr={["2", "5"]} py="2">
                    <HStack space={[2, 3]} justifyContent="space-between">
                    <VStack>
                        <Text _dark={{
                    color: "warmGray.50"
                }} color="coolGray.800" bold>
                        {item.name}
                        </Text>
                        <Text color="coolGray.600" _dark={{
                    color: "warmGray.200"
                }}>
                        {item.productName} - {item.quantity} Adet -  {item.minPrice} ₺
                        </Text>
                        <Text color="coolGray.600" _dark={{
                    color: "warmGray.200"
                }}>
                        {item.isCompleted ? "Son" : "Güncel" } Teklif: {item.lastBid ?? " --" } ₺
                        </Text>
                    </VStack>
                    <Spacer />
                        {item.createdUser != userId 
                            &&   
                            <>
                                <Input keyboardType="numeric" backgroundColor="white" placeholder="Teklif" w="25%" value={bidValue} onChangeText = {(val)=> { setBidValue(val) }}/>
                                { !loading ? <Button onPress={async () => await SaveBid()}>Teklif Ver</Button> : <ActivityIndicator></ActivityIndicator>}
                            </>

                        }
                    </HStack>
                </Box>
    )
}

export default AuctionItem
