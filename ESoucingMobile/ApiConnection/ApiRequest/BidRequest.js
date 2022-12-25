import { PostAsync } from '../BaseApi'
import { AddBidsUrl } from '../ApiVariable/BidVariable'


export const AddBidsRequest = async (model) => {
    return await PostAsync(AddBidsUrl,model)
}