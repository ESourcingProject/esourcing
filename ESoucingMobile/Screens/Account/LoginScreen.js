import React,{useState} from 'react'
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center } from "native-base";
import {LoginRequest} from '../../ApiConnection/ApiRequest/AccountRequest'
import { Alert } from 'react-native';

const LoginScreen = ({navigation}) => {

  const [userName, setUserName] = useState("admin");
  const [password, setPassword] = useState("admin");

  const LoginProcess = async () => {

    let result = await LoginRequest (userName,password);
    if(result.id != undefined && result.id != null)

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: {userId : result.id} }],
      });
    else 
    Alert.alert("Hatalı","Kullanıcı Adı veya Şifre Hatalı! ")
  }
  
  return <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Merhaba
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
          Giriş Yap
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Kullanıcı Adı</FormControl.Label>
            <Input value={userName} onChangeText = {(text) => {setUserName(text)}}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Şifre</FormControl.Label>
            <Input type="password" value={password}  onChangeText = {(text) => {setPassword(text)}}/>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={async ()=> await LoginProcess()}>
            Giriş yap
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              Yeni Misin?.{" "}
            </Text>
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} onPress={() => {navigation.navigate("SignUpScreen")}}>
              Kayıt Ol
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
}

export default LoginScreen