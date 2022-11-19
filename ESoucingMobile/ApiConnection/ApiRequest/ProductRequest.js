import {GetAsync,PostAsync,PutAsync,DeleteAsync} from '../BaseApi'
import {GetProductsUrl, AddProductsUrl, EditProductsUrl, DeleteProductsUrl} from '../ApiVariable/ProductsVariable'

export const GetProductsRequest = async () => {
    return await GetAsync(GetProductsUrl)
}

export const GetProductByIdRequest = async (id) => {
    return await GetAsync(GetProductsUrl + "/" + id)
}

export const AddProductsRequest = async (model) => {
    return await PostAsync(AddProductsUrl,model)
}

export const EditProductsRequest = async (model) => {
    return await PutAsync(EditProductsUrl,model)
}

export const DeleteProductsRequest = async (id) => {
    return await DeleteAsync(DeleteProductsUrl,id)
}