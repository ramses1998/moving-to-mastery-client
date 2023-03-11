import React, {useEffect, useState} from "react";
import {Box, TableRow, Typography} from "@mui/material";
import {MAIN_ACCOUNT, Transaction} from "../../api/transactions";
import {GroupedTransaction, groupTransactionsByMonth} from "../../helpers/transactions";
import {convertNumericMonthHumanReadableFormat} from "../../helpers/dateHelpers";
import {DEFAULT_CURRENCY} from "../../api/main-bank-account";
import {DataTableComponent, StyledTableCell, StyledTableRow} from "./DataTableComponent";

type Row = {
    month: string
    incomes: number,
    expenses: number,
}
type Props = {
    transactions: Transaction[]
}
export const TransactionList: React.FC<Props> = (props: Props) => {

    const [groupedTransactions, setGroupedTransactions] = useState<GroupedTransaction[] | undefined>(undefined)

    const headers = [
        <StyledTableCell key={1}>Mois</StyledTableCell>,
        <StyledTableCell key={2}>Entrées</StyledTableCell>,
        <StyledTableCell key={3}>Sorties</StyledTableCell>,
    ]

    useEffect(() => {
        setGroupedTransactions(groupTransactionsByMonth(props.transactions))
    }, [])

    const computeTableRowsFromYear = (year: number): Row[] => {
        const monthsOfInputYear: number[] = groupedTransactions
            ?.filter(gt => gt.groupTitle.year === year)
            .map(gt => gt.groupTitle.month)!

        return monthsOfInputYear?.map(month => {
            return {
                month: convertNumericMonthHumanReadableFormat(month),
                incomes: groupedTransactions
                    ?.filter(gt => gt.groupTitle.month === month && gt.groupTitle.year === year)
                    .map(gt => gt.transactions)
                    .flatMap(t => t)
                    .filter(t => t.receiverId === MAIN_ACCOUNT)
                    .map(gt => gt.amount)
                    .reduce((acc: number, currentValue: number) => acc + currentValue, 0)!,
                expenses: groupedTransactions
                    ?.filter(gt => gt.groupTitle.month === month && gt.groupTitle.year === year)
                    .map(gt => gt.transactions)
                    .flatMap(t => t)
                    .filter(t => t.senderId === MAIN_ACCOUNT)
                    .map(gt => gt.amount)
                    .reduce((acc: number, currentValue: number) => acc + currentValue, 0)!
            }
        })!
    }

    if (groupedTransactions === undefined) return <div>Loading</div>

    return (
        <Box
            sx={{
                display: "grid",
                gap: 7
            }}
        >
            {Array.from(new Set(groupedTransactions?.map(gt => gt.groupTitle.year)!))
                .map((year, idx) =>
                    <TransactionOfYearContainer key={idx} year={year}>
                        <DataTableComponent headers={<TableRow>{headers}</TableRow>}>
                            {computeTableRowsFromYear(year)
                                ?.map((row, idx) =>
                                    <StyledTableRow key={idx}>
                                        <StyledTableCell scope="row">{row.month}</StyledTableCell>
                                        <StyledTableCell scope="row" sx={{color: "green"}}>{row.incomes} {DEFAULT_CURRENCY}</StyledTableCell>
                                        <StyledTableCell scope="row" sx={{color: "red"}}>{row.expenses} {DEFAULT_CURRENCY}</StyledTableCell>
                                    </StyledTableRow>
                                )}
                        </DataTableComponent>
                    </TransactionOfYearContainer>
                )}
        </Box>
    )
}

const TransactionOfYearContainer = (props: {year: number, children: any}) => {
    return (
        <Box
            sx={{
                display: "grid",
                gap: 1
            }}
        >
            <Typography variant="h6">{props.year}</Typography>
            <Box>
                {props.children}
            </Box>
        </Box>
    )
}
