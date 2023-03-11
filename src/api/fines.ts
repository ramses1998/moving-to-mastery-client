import {CurrencyType} from "./main-bank-account"
import fines from "../data/fines.json"

export type Fine = {
    id: string,
    memberId: string,
    amount: number,
    currency?: CurrencyType
    creationDate: Date
}

export const getAllFinesAPI = async (): Promise<Fine[]> => {
    return fines.map(f => convertToFineType(f))
}

const convertToFineType = (response: any): Fine => {
    return {
        ...response,
        creationDate: new Date(response.creationDate)
    }
}
