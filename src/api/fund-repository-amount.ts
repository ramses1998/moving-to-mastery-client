import {CurrencyType} from "./main-bank-account"
import fundRepositoryAmount from "../data/fund-repository-amount.json"

export type FundRepositoryAmount = {
    id: string
    amount: number
    currency?: CurrencyType
}

export const getFundRepositoryAmountAPI = async (): Promise<FundRepositoryAmount> => {
    // @ts-ignore
    return fundRepositoryAmount
}
