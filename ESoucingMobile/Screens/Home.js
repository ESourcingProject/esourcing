import * as React from 'react';
import { Stack,HStack, Button,Icon } from 'native-base';
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";







const Home = ({ route,navigation }) => {
  const { userId } = route.params;
  return (
    <>
    <HStack space={1} mt="2">
      <Button ml="3" minWidth="48" minHeight="24" onPress={() => navigation.navigate('ProductsScreen', {userId : userId})} leftIcon={<Icon as={Feather} name="shopping-bag" size="md"  />}>
        Ürün İşlemleri
      </Button>
      <Button mr="3" minWidth="48" minHeight="24" onPress={() => navigation.navigate('AuctionManagementScreen', {userId : userId} )} leftIcon={<Icon as={Entypo} name="wallet" size="md" />}>
        İhale Yönetimi
      </Button>
    </HStack>
    <HStack space={1}  mt="2">
      <Button ml="3" minWidth="48" minHeight="24" onPress={() => navigation.navigate('BidManagementScreen', {userId : userId} )} leftIcon={<Icon as={MaterialCommunityIcons} name="cash-plus" size="md" />}>
        İhale Teklif
      </Button>
    </HStack>

    <Stack flex={1} flexDirection={'row'} alignItems={'flex-end'}>
      <Button colorScheme="secondary" m="3" width="96" maxHeight="12" onPress={() => navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }] })} leftIcon={<Icon as={Entypo} name="log-out" size="md" />}>
        Çıkış Yap
      </Button>
    </Stack>


    </>
    
  )}
export default Home


