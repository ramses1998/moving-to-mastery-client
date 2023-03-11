import React, {useContext, useEffect, useState} from "react";
import {Avatar, Box, Button, Chip, IconButton, TableRow, Typography} from "@mui/material";
import {DEFAULT_CURRENCY, MainBankAccount} from "../api/main-bank-account";
import {AppContext} from "../context/AppContext";
import {TransactionList} from "./common/TransationList";
import {MAIN_ACCOUNT, Transaction} from "../api/transactions";
import {useNavigate} from "react-router-dom";
import {FundRepositoryAmount} from "../api/fund-repository-amount";
import {Member} from "../api/members";
import {DataTableComponent, StyledTableCell, StyledTableRow} from "./common/DataTableComponent";
import CheckIcon from "@mui/icons-material/Check";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

export const AccountPage: React.FC = () => {

    const context = useContext(AppContext)
    const navigate = useNavigate()
    const [mainBankAccount, setMainBankAccount] = useState<MainBankAccount | undefined>(undefined)
    const [transactions, setTransactions] = useState<Transaction[] | undefined>(undefined)
    const [fundRepositoryAmount, setFundRepositoryAmount] = useState<FundRepositoryAmount | undefined>(undefined)
    const [members, setMembers] = useState<Member[] | undefined>(undefined)

    useEffect(() => {
        Promise.all([
            context.getMainBankAccount(),
            context.getTransactions(),
            context.getFundRepositoryAmount(),
        ]).then((
            [
                mainBankAccount,
                transactions,
                fundRepositoryAmount
            ]) => {
            setMainBankAccount(mainBankAccount)
            setTransactions(transactions)
            setFundRepositoryAmount(fundRepositoryAmount)
        })
    }, [])

    useEffect(() => {
        transactions && loadMembers().then(data => setMembers(data))
    }, [transactions])

    const loadMembers = async (): Promise<Member[]> => {
        return Promise.all(transactions?.map(t => {
            if (t.senderId !== MAIN_ACCOUNT) {
                return context.getMemberById(t.senderId)
            }
            return context.getMemberById(t.receiverId)
        })!).then(response => response.flatMap(r => r))
    }

    if (mainBankAccount === undefined ||
        transactions === undefined ||
        fundRepositoryAmount === undefined ||
        members === undefined) return <div>Loading ...</div>

    return (
        <Box
            sx={{
                display: "grid",
                gap: 3,
            }}
        >
            <BankAccountOverview
                mainBankAccount={mainBankAccount}
                transactions={transactions}
            />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr max-content",
                    alignItems: "center",
                    gap: 3,
                }}
            >
                <Typography variant={"h5"} sx={{fontWeight: "bold"}}>État annuel</Typography>
                <Button
                    size="small"
                    sx={{padding: 0}}
                    onClick={() => navigate("/annual-transactions")}
                >
                    Toutes les transactions
                </Button>
            </Box>
            <TransactionList
                transactions={transactions.filter(t => t.creationDate.getFullYear() === new Date().getFullYear())}
            />
            <Typography variant={"h5"} sx={{fontWeight: "bold"}}>Fond de caisse</Typography>
            <FundRepositoryForAllMembers
                fundRepositoryAmount={fundRepositoryAmount}
                transactions={transactions}
                members={members}
            />
        </Box>
    )
}

type PropsBankAccountBalance = {
    mainBankAccount: MainBankAccount
    transactions: Transaction[]
}
const BankAccountOverview: React.FC<PropsBankAccountBalance> = (props: PropsBankAccountBalance) => {

    const getMainAccountBalance = (): number => {
        const incomes: number = props.transactions
            .filter(t => t.receiverId === MAIN_ACCOUNT)
            .map(t => t.amount)
            .reduce((acc: number, currentValue: number) => acc + currentValue, 0)

        const expenses: number = props.transactions
            .filter(t => t.senderId === MAIN_ACCOUNT)
            .map(t => t.amount)
            .reduce((acc: number, currentValue: number) => acc + currentValue, 0)

        return (incomes - expenses)
    }

    return (
        <Box
            sx={{
                display: "grid",
                justifyItems: "stretch",
                alignItems: "start",
                borderRadius: 3,
                boxShadow: "0 0 5px var(--primary-color)",
                padding: "15px",
                color: "white",
                backgroundColor: "#1c2f59e0",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            }}
        >
            <Box sx={{
                display: "grid",
                justifyContent: "center",
                justifyItems: "center",
            }}>
                <Typography variant={"h4"} sx={{fontWeight: "bold", padding: 0, margin: 0}}>
                    {/*{props.mainBankAccount.balance} €*/}
                    {getMainAccountBalance()} {DEFAULT_CURRENCY}
                </Typography>
                <Typography sx={{fontSize: 14}}>Solde du compte Paypal</Typography>
                <Typography sx={{fontSize: 11}}>{props.mainBankAccount.paypal}</Typography>
            </Box>
        </Box>
    )
}

type PropsFundRepositoryForAllMembers = {
    fundRepositoryAmount: FundRepositoryAmount
    transactions: Transaction[]
    members: Member[]
}
const FundRepositoryForAllMembers: React.FC<PropsFundRepositoryForAllMembers> = (props: PropsFundRepositoryForAllMembers) => {

    const headers = [
        <StyledTableCell key={1}>Membre</StyledTableCell>,
        <StyledTableCell
            key={2}
            sx={{
                "@media screen and (max-width: 900px)": {
                    display: "none",
                },
            }}
        >
            À payer
        </StyledTableCell>,
        <StyledTableCell key={3}>Déjà payé</StyledTableCell>,
        <StyledTableCell key={4}>Status</StyledTableCell>,
    ]

    const getFundRepositoryContributionOfMemberForCurrentYear = (memberId: string): number => {
        return props.transactions
            .filter(t => t.senderId === memberId)
            .filter(t => t.creationDate.getFullYear() === new Date().getFullYear())
            .filter(t => t.type === "fund")
            .map(t => t.amount)
            .reduce((acc: number, currentValue: number) => acc + currentValue, 0)
    }

    const hasMemberPaidFundRepositoryContribution = (memberId: string): boolean => {
        return props.fundRepositoryAmount.amount - getFundRepositoryContributionOfMemberForCurrentYear(memberId) <= 0
    }

    return (
        <Box>
            <DataTableComponent headers={<TableRow>{headers}</TableRow>}>
                {props.members.map((member, idx) =>
                    <StyledTableRow key={idx}>
                        <StyledTableCell scope="row">
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    alt={member?.firstName + " " + member?.lastName}
                                    src={member?.avatar}
                                    children={member?.avatar === undefined ?
                                        member?.firstName![0] + "" + member?.lastName![0] : null
                                    }
                                    sx={{
                                        width: 45,
                                        height: 45,
                                        border: "2px solid grey",
                                        "@media screen and (max-width: 900px)": {
                                            width: 35,
                                            height: 35,
                                        },
                                    }}
                                />
                                <Typography>{member?.firstName + " " + member?.lastName}</Typography>
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell
                            scope="row"
                            sx={{
                                "@media screen and (max-width: 900px)": {
                                    display: "none",
                                },
                            }}
                        >
                            {props.fundRepositoryAmount.amount + " " + DEFAULT_CURRENCY}
                        </StyledTableCell>
                        <StyledTableCell
                            scope="row"
                            sx={{
                                color: hasMemberPaidFundRepositoryContribution(member.id) ? "green" : "red"
                            }}
                        >
                            {getFundRepositoryContributionOfMemberForCurrentYear(member.id) + " " + DEFAULT_CURRENCY}
                        </StyledTableCell>
                        <StyledTableCell scope="row">
                            <Chip
                                label={hasMemberPaidFundRepositoryContribution(member.id) ? "à jour" : "pas à jour"}
                                color={hasMemberPaidFundRepositoryContribution(member.id) ? "success" : "error"}
                                sx={{
                                    justifySelf: "start",
                                    "@media screen and (max-width: 900px)": {
                                        display: "none",
                                    },
                                }}
                            />
                            <IconButton
                                sx={{
                                    backgroundColor: hasMemberPaidFundRepositoryContribution(member.id) ? "green" : "red",
                                    justifySelf: "start",
                                    "@media screen and (min-width: 900px)": {
                                        display: "none",
                                    },
                                    "&:hover": {
                                        backgroundColor: hasMemberPaidFundRepositoryContribution(member.id) ? "green" : "red",
                                    },
                                }}>
                                {hasMemberPaidFundRepositoryContribution(member.id) ?
                                    <CheckIcon sx={{color: "white"}} fontSize="small" /> :
                                    <ClearOutlinedIcon sx={{color: "white"}} fontSize="small" />
                                }
                            </IconButton>
                        </StyledTableCell>
                    </StyledTableRow>
                )}
            </DataTableComponent>
        </Box>
    )
}
