import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {CSSObject, styled, Theme} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {Box, Chip} from "@mui/material";
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import {useLocation, useNavigate} from "react-router-dom";
import {LogoComponent} from "./LogoComponent";
import {useContext, useEffect, useState} from "react";
import {Member} from "../../api/members";
import {AppContext} from "../../context/AppContext";

export const drawerWidth = 250

export type SideBarButtonType = {
    label: any,
    icon: any
    onClick?: () => void
    isActive?: boolean
}

type Props = {
    open: boolean
    setOpen: (value: boolean) => void
    theme?: any
}
export const SideBarDrawerContainer: React.FC<Props> = (props: Props) => {

    const navigate = useNavigate()
    const location = useLocation()
    const context = useContext(AppContext)
    const [members, setMembers] = useState<Member[] | undefined>(undefined)

    useEffect(() => {
        context.getAllMembers().then(data => setMembers(data))
    }, [])

    const sideBarButtons: SideBarButtonType[] = [
        {label: "Acceuil", icon: <DoorBackOutlinedIcon/>, onClick: () => navigate("/home"), isActive: location.pathname === "/home" || location.pathname === "/"},
        {
            label:
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center"}}>
                    <div>Membres</div>
                    <Chip label={members?.length} color={"primary"} sx={{justifySelf: "end"}} size={"small"}/>
                </div>,
            icon: <PeopleAltOutlinedIcon/>,
            onClick: () => navigate("/members"),
            isActive: location.pathname === "/members"
        },
        {label: "Ordre de beneficiaire", icon: <AlignHorizontalCenterIcon/>, onClick: () => navigate("/contribution-order"), isActive: location.pathname === "/contribution-order" },
        {label: "Cotisations", icon: <SavingsOutlinedIcon/>, onClick: () => navigate("/monthly-contribution"), isActive: location.pathname === "/monthly-contribution"},
        {label: "Compte", icon: <AccountBalanceOutlinedIcon/>, onClick: () => navigate("/fund-repository"), isActive: location.pathname === "/fund-repository" },
    ]

    const handleDrawerClose = () => {
        props.setOpen(false)
    }

    if (members === undefined) return <div>Loading...</div>

    return (
        <Drawer
            variant="permanent"
            open={props.open}
            sx={{
                "@media screen and (max-width: 900px)": {
                    display: "none",
                },
            }}
        >
            <DrawerHeader>
                <Box>
                    <LogoComponent width={"70px"}/>
                </Box>
                <IconButton onClick={handleDrawerClose}>
                    {props.theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List sx={{paddingTop: 2}}>
                {sideBarButtons.map((button, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{
                            display: 'block',
                            backgroundColor: button.isActive ? "#80808052" : "initial",
                        }}
                        onClick={button.onClick}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: props.open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: props.open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {button.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={button.label}
                                sx={{
                                    opacity: props.open ? 1 : 0,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
)

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr max-content',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1, 0, 3),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}))
