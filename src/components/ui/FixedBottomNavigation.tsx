import React from "react";
import DoorBackOutlinedIcon from "@mui/icons-material/DoorBackOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AlignHorizontalCenterIcon from "@mui/icons-material/AlignHorizontalCenter";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import {SideBarButtonType} from "./SideBarDrawerContainer";
import {useNavigate} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction, Box, CssBaseline, Paper} from "@mui/material";

export const FixedBottomNavigation: React.FC = () => {

    const navigate = useNavigate()
    const [value, setValue] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);

    const sideBarButtons: SideBarButtonType[] = [
        {label: "Acceuil", icon: <DoorBackOutlinedIcon/>, onClick: () => navigate("/home") },
        {label: "Membres", icon: <PeopleAltOutlinedIcon/>, onClick: () => navigate("/members") },
        {label: "bénéficiaires", icon: <AlignHorizontalCenterIcon/>, onClick: () => navigate("/contribution-order") },
        {label: "Cotisations", icon: <SavingsOutlinedIcon/>, onClick: () => navigate("/monthly-contribution") },
        {label: "Compte", icon: <AccountBalanceOutlinedIcon/>, onClick: () => navigate("/fund-repository") },
    ]

    React.useEffect(() => {
        (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    }, [value]);

    return (
        <Box
            ref={ref}
            sx={{
                pb: 7,
                "@media screen and (min-width: 900px)": {
                    display: "none",
                }
            }}
        >
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={24}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event: any, newValue: React.SetStateAction<number>) => {
                        setValue(newValue);
                    }}
                >
                    {sideBarButtons.map((button, idx) =>
                        <BottomNavigationAction
                            key={idx}
                            label={button.label}
                            icon={button.icon}
                            onClick={button.onClick}
                        />
                    )}
                </BottomNavigation>
            </Paper>
        </Box>
    )
}
