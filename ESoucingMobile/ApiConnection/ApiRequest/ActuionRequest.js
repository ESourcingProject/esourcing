import {GetAsync,PostAsync,PutAsync} from '../BaseApi'
import { GetAuctionsUrl, GetAuctionsWithLastBidUrl, AddAuctionsUrl, EditAuctionsUrl, GetActiveAuctionsUrl } from '../ApiVariable/AuctionVariable'

export const GetAuctionsRequest = async () => {
    return await GetAsync(GetAuctionsUrl)
}

export const GetAuctionsWithLastBidRequest = async (userId) => {
    return await GetAsync(GetAuctionsWithLastBidUrl + "/" + userId)
}

export const AddAuctionsRequest = async (model) => {
    return await PostAsync(AddAuctionsUrl,model)
}

export const EditAuctionsRequest = async (model) => {
    return await PutAsync(EditAuctionsUrl,model)
}

export const GetActiveAuctionsRequest = async () => {
    return await GetAsync(GetActiveAuctionsUrl)
}