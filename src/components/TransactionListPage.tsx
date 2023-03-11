import React, {useContext, useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import {TransactionList} from "./common/TransationList";
import {AppContext} from "../context/AppContext";
import {Transaction} from "../api/transactions";
import {useNavigate} from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const TransactionListPage: React.FC = () => {

    const context = useContext(AppContext)
    const navigate = useNavigate()
    const [transactions, setTransactions] = useState<Transaction[] | undefined>(undefined)

    useEffect(() => {
        context.getTransactions().then(data => setTransactions(data))
    }, [])

    if (transactions === undefined) return <div>Loading...</div>

    return (
        <Box
            sx={{
                display: "grid",
                gap: 3,
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gap: 1,
                }}
            >
               <Box
                   sx={{
                       display: "flex",
                       alignItems: "center",
                       gap: 1,
                       justifyContent:"start",
                       justifySelf: "start",
                       "&:hover": {
                           cursor: "pointer",
                       },
                   }}
                   onClick={() => navigate(-1)}
               >
                   <ArrowBackIosNewIcon fontSize={"small"} sx={{color: "#1976d2"}}/>
                   <Typography variant={"h5"} sx={{fontWeight: "bold", fontSize: 18, color: "#1976d2"}}>
                       Retour
                   </Typography>
               </Box>
                <Typography variant={"h5"} sx={{fontWeight: "bold"}}>Toutes les transactions annuelles</Typography>
            </Box>
            <TransactionList transactions={transactions}/>
        </Box>
    )
}
