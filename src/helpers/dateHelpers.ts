
const months = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre"
]

export const convertNumericMonthHumanReadableFormat = (month: number): string => {
    return months[month]
}

export const convertHumanReadableMonthToNumericFormat = (month: string): number => {
    return months.indexOf(month)
}
