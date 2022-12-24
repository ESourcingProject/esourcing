import * as React from 'react';
import { Button, View, Text } from 'react-native';

const Home = ({ route,navigation }) => {
  const { userId } = route.params;
  return (
    <View >
      <Text>Home Screen</Text>
      <Button
        title="Go to Products"
        onPress={() => navigation.navigate('ProductsScreen', {userId : userId})}
      />
      <Button style={{ marginTop: 15 }}
        title="Go to Auction"
        onPress={() => navigation.navigate('AuctionManagementScreen', {userId : userId} )}
      />
    </View>
  );
}
export default Home