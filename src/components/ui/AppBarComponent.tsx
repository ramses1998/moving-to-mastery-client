import React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {drawerWidth} from "./SideBarDrawerContainer";
import {Route, Routes} from "react-router-dom";

type Props = {
    open: boolean
    setOpen: (value: boolean) => void
}
export const AppBarComponent: React.FC<Props> = (props: Props) => {
    return (
        <AppBar
            position="fixed"
            open={props.open}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => props.setOpen(true)}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(props.open && { display: 'none' }),
                        "@media screen and (max-width: 900px)": {
                            display: "none",
                        },
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        "@media screen and (max-width: 900px)": {
                            display: "none",
                            pl: 2,
                        },
                    }}
                >
                    <Routes>
                        <Route path={"/"} element={<div>Acceuil</div>}/>
                        <Route path={"/home"} element={<div>Acceuil</div>}/>
                        <Route path={"/members"} element={<div>Membres</div>}/>
                        <Route path={"/contribution-order"} element={<div>Ordre de beneficiaire</div>}/>
                        <Route path={"/monthly-contribution"} element={<div>Cotisations</div>}/>
                        <Route path={"/fund-repository"} element={<div>Compte</div>}/>
                        <Route path={"/annual-transactions"} element={<div>Transactions du compte Paypal</div>}/>

                    </Routes>
                </Typography>
                <Typography sx={{
                    fontWeight: "bold",
                    "@media screen and (min-width: 900px)": {
                        display: "none",
                    },
                }}>
                    Moving to mastery
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    backgroundColor: "var(--primary-color)",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))
