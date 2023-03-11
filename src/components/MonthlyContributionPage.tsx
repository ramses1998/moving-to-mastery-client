import React, {useContext, useEffect, useState} from "react";
import {Box} from "@mui/material";
import {MainBankAccount} from "../api/main-bank-account";
import {MAIN_ACCOUNT, Transaction} from "../api/transactions";
import {AppContext} from "../context/AppContext";
import {ContributionAmount} from "../api/contribution-amount";
import {Fine} from "../api/fines";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {convertNumericMonthHumanReadableFormat} from "../helpers/dateHelpers";
import {GroupedTransaction, GroupTitle, groupTransactionsByMonth} from "../helpers/transactions";
import {ContributionItem} from "./ContributionItem";

type FilterOptionType = {
    label:string,
    groupTitle: GroupTitle
}
export const MonthlyContributionPage: React.FC = () => {

    const context = useContext(AppContext)
    const [mainBankAccount, setMainBankAccount] = useState<MainBankAccount | undefined>(undefined)
    const [transactions, setTransactions] = useState<Transaction[] | undefined>(undefined)
    const [groupedTransactions, setGroupedTransactions] = useState<GroupedTransaction[] | undefined>(undefined)
    const [filteredTransactions, setFilteredTransactions] = useState<GroupedTransaction[] | undefined>(undefined)
    const [contributionAmount, setContributionAmount] = useState<ContributionAmount | undefined>(undefined)
    const [fines, setFines] = useState<Fine[] | undefined>(undefined)
    const [filterOptions, setFilterOptions] = useState<FilterOptionType[] | undefined>(undefined)
    const [selectedFilterValue, setSelectedFilterValue] = useState<FilterOptionType | null>(null)

    useEffect(() => {
        Promise.all([
            context.getMainBankAccount(),
            context.getTransactions("contribution"),
            context.getContributionAmount(),
            context.getAllFines(),
        ]).then((
            [
                mainBankAccount,
                transactions,
                contributionAmount,
                fines
            ]) => {
            setMainBankAccount(mainBankAccount)
            setTransactions(transactions)
            setContributionAmount(contributionAmount)
            setFines(fines)
        })
    }, [])

    useEffect(() => {
        transactions && setGroupedTransactions(() => groupTransactionsByMonth(transactions.filter(t => t.senderId !== MAIN_ACCOUNT)))
    }, [mainBankAccount, transactions])

    useEffect(() => {
        groupedTransactions && setFilterOptions(groupedTransactions?.map(gt => {
            return {
                label: convertNumericMonthHumanReadableFormat(gt.groupTitle.month) + " " + gt.groupTitle.year,
                groupTitle: gt.groupTitle
            }
        }))
    }, [groupedTransactions])

    useEffect(() => {
        setFilteredTransactions(filterContributions())
    }, [selectedFilterValue])

    const filterContributions = (): GroupedTransaction[] => {
        return groupedTransactions
            ?.filter(gt =>
                gt.groupTitle.month === selectedFilterValue?.groupTitle.month! &&
                gt.groupTitle.year === selectedFilterValue?.groupTitle.year!
            ) ?? []
    }

    const handleFilterValueChange = (event: any, selectedValue: FilterOptionType | null) => {
        setSelectedFilterValue(selectedValue)
    }

    if (mainBankAccount === undefined ||
        transactions === undefined ||
        groupedTransactions === undefined ||
        filteredTransactions === undefined ||
        contributionAmount === undefined ||
        fines === undefined ||
        filterOptions === undefined) return <div>Loading...</div>

    return (
        <Box
            sx={{
                display: "grid",
                gap: 3
            }}>
            <Autocomplete
                disablePortal
                options={filterOptions}
                size="small"
                onChange={handleFilterValueChange}
                renderInput={(params) => <TextField {...params} size="small" label="Rechercher des cotisations" />}
            />
            <Box
                sx={{
                    display: "grid",
                    gap: 5
                }}>
                {(selectedFilterValue !== null ? filteredTransactions : groupedTransactions)
                    .map((gt, idx) =>
                        <ContributionItem
                            key={idx}
                            groupedTransaction={gt}
                            contributionAmount={contributionAmount}
                            fines={fines}
                        />
                    )}
            </Box>
        </Box>
    )
}
