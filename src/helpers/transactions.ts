import {Transaction} from "../api/transactions";

export type GroupTitle = {
    month: number
    year: number
}
export type GroupedTransaction = {
    groupTitle: GroupTitle,
    transactions: Transaction[]
}

export const groupTransactionsByMonth = (transactions: Transaction[]): GroupedTransaction[] => {
    const groupTitles: GroupTitle[] = transactions
        .map(t => {
                return {
                    month: t.creationDate.getMonth(),
                    year: t.creationDate.getFullYear()
                }
            }
        )
        .reduce((acc: GroupTitle[], current: GroupTitle) => {
            return acc.find(groupedTitle =>
                groupedTitle.month === current.month && groupedTitle.year === current.year
            ) !== undefined ? acc : [...acc, current]
        }, [])

    return groupTitles
        .sort((a, b) => a.month - b.month)
        .sort((a, b) => b.year - a.year)
        .map(group => {
            return {
                groupTitle: group,
                transactions: transactions?.filter(t =>
                    t.creationDate.getMonth() === group.month &&
                    t.creationDate.getFullYear() === group.year
                )
            }
        })
}
