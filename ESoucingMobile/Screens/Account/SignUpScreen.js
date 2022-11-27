import React,{useState} from 'react'
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider } from "native-base";
import {SignUpRequest} from '../../ApiConnection/ApiRequest/AccountRequest'
import { Alert } from 'react-native';

const SignUpScreen = ({navigation}) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");


    const SignUpProcess = async () => {

        if(password != password2){
            Alert.alert("Hata","Girilen şifreler Aynı Değil")
            return;
        }
        if(await SignUpRequest (userName,password)){
            
            Alert.alert("Başarılı","Kayıt işleminiz başarılı bir şekilde tamamlanmıltır.",
            [
                { text: "OK", onPress: async () =>{
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'LoginScreen' }],
                      });
                }},
            ])
          
        }
        else {
          Alert.alert("Hata","İşlem Başarısız ")
        }
      }


    return <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading size="lg" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }} fontWeight="semibold">
            Merhaba
          </Heading>
          <Heading mt="1" color="coolGray.600" _dark={{
          color: "warmGray.200"
        }} fontWeight="medium" size="xs">
            Kayıt Ol ve Devam et!
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
            <FormControl>
              <FormControl.Label>Şifreni Doğrula</FormControl.Label>
              <Input type="password" value={password2}  onChangeText = {(text) => {setPassword2(text)}}/>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={async ()=> await SignUpProcess()}>
              Kayıt Ol
            </Button>
          </VStack>
        </Box>
      </Center>
  };

export default SignUpScreen