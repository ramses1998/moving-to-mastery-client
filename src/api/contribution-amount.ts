import {CurrencyType} from "./main-bank-account";
import * as contributionAmount from "../data/contribution-amount.json"

export type ContributionAmount = {
    id: string
    amount: number
    currency?: CurrencyType
}

export const getContributionAmountAPI = async (): Promise<ContributionAmount> => {
    // @ts-ignore
    return contributionAmount
}
