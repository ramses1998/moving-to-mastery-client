import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";

type Props = {
    headers: any
    children?: any
}
export const DataTableComponent: React.FC<Props> = (props: Props) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableHead>
                    {props.headers}
                </TableHead>
                <TableBody>
                    {props.children}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "var(--primary-color)",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))
