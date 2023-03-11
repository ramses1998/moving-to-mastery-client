import React, {useContext, useEffect, useState} from "react";
import {Avatar, Box, Skeleton, Typography} from "@mui/material";
import {Notification} from "../api/notifications";
import {AppContext} from "../context/AppContext";
import {Member} from "../api/members";

export const HomePage: React.FC = () => {

    const context = useContext(AppContext)
    const [notifications, setNotifications] = useState<Notification[] | undefined>(undefined)
    const [notificationIssuers, setNotificationIssuers] = useState<Member[] | undefined>(undefined)

    useEffect(() => {
        loadNotifications().then(data => setNotifications(data))
    }, [])

    useEffect(() => {
        notifications && loadNotificationIssuers().then(data => setNotificationIssuers(data))
    }, [notifications])

    const loadNotifications = async (): Promise<Notification[]> => {
        return await context.getAllNotifications()
    }

    const loadNotificationIssuers = async (): Promise<Member[]> => {
        return await Promise.all(
            notifications?.map(n => context.getMemberById(n.issuerId))!
        )
    }

    const getIssuerOfNotification = (issuerId: string): Member => {
        return notificationIssuers?.find(m => m.id === issuerId)!
    }

    if (notifications === undefined ||
        notificationIssuers === undefined) return <NotificationListLoadingSkeleton/>

    return (
        <Box
            sx={{
                display: "grid",
                gap: 3
            }}>
            <Typography variant="h4">Notifications</Typography>
            <Box
                sx={{
                    display: "grid",
                    gap: 3
                }}>
                {notifications.map((n, idx) =>
                    <NotificationItem
                        key={idx}
                        notification={n}
                        issuer={getIssuerOfNotification(n.issuerId)}
                    />
                )}
                {notifications.length === 0 ? <Typography sx={{color: "gray"}}>Aucune notification pour l'instant</Typography> : null}
            </Box>
        </Box>
    )
}

type PropsNotificationItem = {
    notification: Notification
    issuer: Member
}
const NotificationItem: React.FC<PropsNotificationItem> = (props: PropsNotificationItem) => {
    return (
        <Box
            sx={{
                display: "grid",
                gap: 1,
                boxShadow: "0 0 3px gray",
                borderRadius: 2,
                padding: "15px 20px"
            }}>
            <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                <Avatar
                    alt={props.issuer.firstName + " " + props.issuer.lastName}
                    src={props.issuer.avatar}
                    children={props.issuer.avatar === undefined ?
                        props.issuer?.firstName![0] + "" + props.issuer?.lastName![0] : null
                    }
                    sx={{ width: 28, height: 28, border: "2px solid grey"}}
                />
                <div style={{fontSize: "15px"}}>{props.issuer.firstName + " " + props.issuer.lastName}</div>
                <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                    <div style={{backgroundColor: "gray", color: "gray", borderRadius: "50%", height: "6px", width: "6px", margin: "0 2px 0 2px", justifySelf: "flex-start"}}/>
                    <div style={{fontSize: "14px", color: "gray"}}>
                        {props.notification.creationDate
                            .toLocaleDateString([], {day: '2-digit', month: '2-digit', year: "numeric"})
                        }
                    </div>
                </div>
            </Box>
            <Typography variant="h6">{props.notification.title}</Typography>
            <Typography>{props.notification.content}</Typography>
        </Box>
    )
}

const NotificationListLoadingSkeleton: React.FC = () => {
    return (
        <Box
            sx={{
                display: "grid",
                gap: 3
            }}
        >
            <Typography>Notifications en cours de chargement...</Typography>
            {[...Array(5)].map((i, idx) =>
                <Box
                    key={idx}
                    sx={{
                        display: "grid",
                        gap: 1,
                        borderRadius: 2,
                        padding: "15px 20px",
                        width: "100%",
                        border: "1px solid #d5d5d5",
                    }}>
                    <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                        <Skeleton variant="circular">
                            <Avatar/>
                        </Skeleton>
                        <Skeleton width="20vw">
                            <Typography style={{fontSize: "15px"}}>.</Typography>
                        </Skeleton>
                        <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                            <div style={{backgroundColor: "gray", color: "gray", borderRadius: "50%", height: "6px", width: "6px", margin: "0 2px 0 2px", justifySelf: "flex-start"}}/>
                            <Skeleton width="5vw">
                                <Typography style={{fontSize: "14px", color: "gray"}}>.</Typography>
                            </Skeleton>
                        </div>
                    </Box>
                    <Typography variant="h6">
                        <Skeleton/>
                    </Typography>
                    <Typography>
                        <Skeleton/>
                    </Typography>
                </Box>
            )}
        </Box>
    )
}
