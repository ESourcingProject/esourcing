import {GetAsync,PostAsync} from '../BaseApi'
import {LoginUrl,SignUpUrl} from '../ApiVariable/AccountsVariable'

export const LoginRequest = async (username,password) => {

    let url = LoginUrl + "?name=" + username + "&password=" + password;
    let result = await GetAsync(url)

    return result;
 }

export const SignUpRequest = async (username,password) => {
    let model = {
        "id": "",
        "userName": username,
        "password": password
    }
    let result = await PostAsync(SignUpUrl,model);

    if(result.id != undefined && result.id != null)
        return true;
    else 
        return false;

}