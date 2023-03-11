import React from "react";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {DrawerHeader, SideBarDrawerContainer} from "./ui/SideBarDrawerContainer";
import {AppBarComponent} from "./ui/AppBarComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./HomePage";
import {MemberPage} from "./MemberPage";
import {ContributionOrderPage} from "./ContributionOrderPage";
import {MonthlyContributionPage} from "./MonthlyContributionPage";
import {AccountPage} from "./AccountPage";
import {FixedBottomNavigation} from "./ui/FixedBottomNavigation";
import {TransactionListPage} from "./TransactionListPage";

export const AppWrapperContainer: React.FC = () => {

    const theme = useTheme()
    const [open, setOpen] = React.useState(false)

    return (
        <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBarComponent open={open} setOpen={setOpen}/>
                <SideBarDrawerContainer open={open} setOpen={setOpen} theme={theme}/>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 4,
                        "@media screen and (max-width: 900px)": {
                            padding: "20px 15px 150px 15px",
                        },
                    }}
                >
                    <DrawerHeader />
                    <Box>
                        <Routes>
                            <Route path={"/"} element={<HomePage/>}/>
                            <Route path={"/home"} element={<HomePage/>}/>
                            <Route path={"/members"} element={<MemberPage/>}/>
                            <Route path={"/contribution-order"} element={<ContributionOrderPage/>}/>
                            <Route path={"/monthly-contribution"} element={<MonthlyContributionPage/>}/>
                            <Route path={"/fund-repository"} element={<AccountPage/>}/>
                            <Route path={"/annual-transactions"} element={<TransactionListPage/>}/>
                        </Routes>
                    </Box>
                </Box>
                <FixedBottomNavigation/>
            </Box>
        </BrowserRouter>
    )
}
