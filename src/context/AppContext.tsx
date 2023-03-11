import React, {createContext} from "react";
import {getAllNotificationsAPI} from "../api/notifications";
import {Notification} from "../api/notifications";
import {getAllMembersAPI, getMemberByIdAPI, getMemberByPaypalAPI, Member} from "../api/members";
import {ContributionOrder, getAllContributionOrderAPI} from "../api/contribution-order";
import {getMainBankAccountAPI, MainBankAccount} from "../api/main-bank-account";
import {getTransactionsAPI, Transaction, TransactionType} from "../api/transactions";
import {ContributionAmount, getContributionAmountAPI} from "../api/contribution-amount";
import {Fine, getAllFinesAPI} from "../api/fines";
import {FundRepositoryAmount, getFundRepositoryAmountAPI} from "../api/fund-repository-amount";

type Output = {
    getAllNotifications: () => Promise<Notification[]>
    getAllMembers: () => Promise<Member[]>
    getMemberById: (id: string) => Promise<Member>
    getMemberByPaypal: (paypal: string) => Promise<Member>
    getAllContributionOrder: () => Promise<ContributionOrder[]>
    getMainBankAccount: () => Promise<MainBankAccount>
    getTransactions: (type?: TransactionType) => Promise<Transaction[]>
    getContributionAmount: () => Promise<ContributionAmount>
    getAllFines: () => Promise<Fine[]>
    getFundRepositoryAmount: () => Promise<FundRepositoryAmount>
}

// @ts-ignore
export const AppContext = createContext<Output>({})

type Props = {
    children: any
}
export const AppContextProvider: React.FC<Props> = (props: Props) => {

    const getAllNotifications = async (): Promise<Notification[]> => {
        return await getAllNotificationsAPI()
    }

    const getAllMembers = async (): Promise<Member[]> => {
        return await getAllMembersAPI()
    }

    const getMemberById = async (id: string): Promise<Member> => {
        return await getMemberByIdAPI(id)
    }

    const getMemberByPaypal = async (paypal: string): Promise<Member> => {
        return await getMemberByPaypalAPI(paypal)
    }

    const getAllContributionOrder = async (): Promise<ContributionOrder[]> => {
        return await getAllContributionOrderAPI()
    }

    const getMainBankAccount = async (): Promise<MainBankAccount> => {
        return await getMainBankAccountAPI()
    }

    const getTransactions = async (type?: TransactionType): Promise<Transaction[]> => {
        return await getTransactionsAPI(type)
    }

    const getContributionAmount = async (): Promise<ContributionAmount> => {
        return await getContributionAmountAPI()
    }

    const getAllFines = async (): Promise<Fine[]> => {
        return await getAllFinesAPI()
    }

    const getFundRepositoryAmount = async (): Promise<FundRepositoryAmount> => {
        return await getFundRepositoryAmountAPI()
    }

    return (
        <AppContext.Provider value={{
            getAllNotifications: getAllNotifications,
            getAllMembers: getAllMembers,
            getMemberById: getMemberById,
            getMemberByPaypal: getMemberByPaypal,
            getAllContributionOrder: getAllContributionOrder,
            getMainBankAccount: getMainBankAccount,
            getTransactions: getTransactions,
            getContributionAmount: getContributionAmount,
            getAllFines: getAllFines,
            getFundRepositoryAmount: getFundRepositoryAmount,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
