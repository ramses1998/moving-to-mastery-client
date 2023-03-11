import {CurrencyType} from "./main-bank-account";
import transactions from "../data/transactions.json"

export const MAIN_ACCOUNT: string = "main-account"

export type TransactionType = "contribution" | "fund" | "expense"

export type Transaction = {
    id: string,
    amount: number,
    senderId: string,
    receiverId: string,
    currency?: CurrencyType
    type: TransactionType
    creationDate: Date
}

export const getTransactionsAPI = async (type?: TransactionType): Promise<Transaction[]> => {
    return (type !== undefined ? transactions.filter(t => t.type === type) : transactions)
        .map(t => convertToTransactionType(t))
}

const convertToTransactionType = (response: any): Transaction => {
    return {
        ...response,
        creationDate: new Date(response.creationDate)
    }
}
