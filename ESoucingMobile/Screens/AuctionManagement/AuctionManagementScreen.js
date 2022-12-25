import React, { useState, useEffect } from 'react'
import { ScrollView,Alert,ActivityIndicator } from 'react-native';
import { Text, Button, Box, FlatList, Heading, HStack, VStack, Spacer } from "native-base";
import {GetAuctionsWithLastBidRequest, EditAuctionsRequest} from '../../ApiConnection/ApiRequest/ActuionRequest'

const AuctionManagementScreen = ({route,navigation}) => {
    const { userId } = route.params;
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchAuctions = async () => {
        await setAuctions(await GetAuctionsWithLastBidRequest(userId))
      }
      fetchAuctions();
    },[auctions]);

    const EditAuction =  async (editedData) => {
        await setLoading(true);
        let result = await EditAuctionsRequest(editedData);

        try{
            if(result.id != ""){
                Alert.alert("Başarılı","İhale Sonlandırılmıştır.")
            }
        }catch{
            Alert.alert("Hata","Beklenmedik bir hata ile karşılaşıldı.")
        }finally{
             await setLoading(false);
        }
    }

    return (
            <ScrollView> 
                <Box alignItems="center" m="2">
                    {!loading ? 
                        <Button m="2" minW="95%" onPress={() => {navigation.navigate('AddAuctionScreen', {userId : userId})}}>Yeni İhale Oluştur</Button> 
                        : <ActivityIndicator></ActivityIndicator> }
                </Box>
                <Box>
                    <Heading fontSize="lg" p="2" pb="2">
                        Aktif İhalelerim
                    </Heading>
                    <FlatList data={auctions} renderItem={({
                    item
                    }) => <Box borderBottomWidth="1" _dark={{
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
                            {!item.isCompleted && 
                                <Button onPress={async () => await EditAuction({...item,isCompleted:true})}>Sonlandır</Button>
                            }
                            </HStack>
                        </Box>} keyExtractor={item => item.id} />
                </Box>
            </ScrollView>
    )
}

export default AuctionManagementScreen
