import mainBankAccount from "../data/main-bank-account.json"

export type CurrencyType = "EUR" | "USD" | "BTC" | "ETH" | "SOL" | "XAF-CFA"

export const DEFAULT_CURRENCY: CurrencyType = "EUR"

export type MainBankAccount = {
    id: string
    iban?: string
    paypal?: string
    currency?: CurrencyType
}

export const getMainBankAccountAPI = async (): Promise<MainBankAccount> => {
    // @ts-ignore
    return mainBankAccount
}
