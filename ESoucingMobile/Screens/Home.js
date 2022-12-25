import * as React from 'react';
import { HStack, Button,Icon } from 'native-base';
import { Ionicons,MaterialIcons } from "react-native-svg";

const Home = ({ route,navigation }) => {
  const { userId } = route.params;
  return (
    <>
    <HStack space={1} mt="2">
      <Button ml="3" minWidth="48" minHeight="24" onPress={() => navigation.navigate('ProductsScreen', {userId : userId})} leftIcon={<Icon as={MaterialIcons} name="battery-full" size="md" color="red.200" />}>
        Ürün İşlemleri
      </Button>
      <Button mr="3" minWidth="48" minHeight="24" onPress={() => navigation.navigate('AuctionManagementScreen', {userId : userId} )} leftIcon={<Icon as={Ionicons} name="cloud-download-outline" size="md" />}>
        İhale Yönetimi
      </Button>
    </HStack>
    <HStack space={1}  mt="2">
      <Button ml="3" minWidth="48" minHeight="24" onPress={() => navigation.navigate('BidManagementScreen', {userId : userId} )} leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="md" />}>
        İhale Teklif
      </Button>
    </HStack>
    </>
    
  )}
export default Home


