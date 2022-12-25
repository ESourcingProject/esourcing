import React, { useState, useEffect } from 'react'
import { Box, FlatList, Heading } from "native-base";
import { GetActiveAuctionsRequest } from '../../ApiConnection/ApiRequest/ActuionRequest'
import AuctionItem from "../../Components/AuctionItem";

const BidManagementScreen = ({route,navigation}) => {
    const { userId } = route.params;
    const [activeAuctions, setActiveAuctions] = useState([]);


    useEffect(() => {
      fetchActiveAuctions = async () => {
        await setActiveAuctions(await GetActiveAuctionsRequest())
      }
      fetchActiveAuctions();
    },[activeAuctions]);

    return (
            <> 
                <Box>
                    <Heading fontSize="lg" p="2" pb="2">
                        Aktif İhaleler
                    </Heading>
                    <FlatList data={activeAuctions } renderItem={({
                    item
                    }) => <AuctionItem key={item.id} item = {item} userId = {userId}/>} keyExtractor={item => item.id} />
                </Box>
            </>
    )
}

export default BidManagementScreen

