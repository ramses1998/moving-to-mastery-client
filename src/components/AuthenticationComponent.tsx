import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/userContext";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {LogoComponent} from "./ui/LogoComponent";

type Props = {
    children?: any
}
export const AuthenticationComponent: React.FC<Props> = (props: Props) => {

    const userContext = useContext(UserContext)
    const [username, setUsername] = useState<string>("")
    const [error, setError] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (userContext.user === undefined) {
            setUsername("")
            setError(undefined)
        }
    }, [userContext, userContext.user])

    const handleOnChange = (event: any) => {
        setUsername(event.target.value)
    }

    const handleLogin = () => {
        userContext.login(username)
            .then(() => {
                const user = userContext.user
                if (user === undefined) {
                    setError("Aucun compte correspondant à ce paypal n'a été trouvé.")
                    return
                }
                setError(undefined)
            })
    }

    return (
        <div>
            {userContext.user === undefined ?
                <Box
                    sx={{
                        display: "grid",
                        alignItems: "end",
                        justifyContent: "center",
                        justifyItems: "center",
                        backgroundColor: "#003f8c",
                        height: 300,
                        maxHeight: 300,
                    }}
                >
                    <Typography
                        sx={{
                            color: "white",
                            pt: 10,
                            fontSize: 50,
                        }}
                        variant="h5"
                    >
                        Moving to mastery
                    </Typography>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            height: 300,
                            width: 450,
                            marginTop: "70px",
                            borderRadius: 2,
                            p: 4,
                            borderBottom: "5px solid #003f8c",
                        }}
                        elevation={24}
                    >
                        <LogoComponent style={{alignSelf: "center"}} width="60px"/>
                        <Typography
                            sx={{
                                mt: 5,
                                alignSelf: "center",
                                color: "gray",
                            }}
                            variant={"h6"}
                        >
                            Connexion
                        </Typography>
                        <TextField
                            sx={{
                                mt: 3,
                                width: "100%",
                            }}
                            size="small"
                            placeholder="Entre ton Paypal pour te connecter a ton compte"
                            label="Paypal"
                            required={true}
                            value={username}
                            onChange={handleOnChange}
                        />
                        {error !== undefined ?
                            <Typography
                                sx={{
                                    mt: 1,
                                    color: "red",
                                }}
                            >
                                {error}
                            </Typography> : null
                        }
                        <Button
                            variant="contained"
                            sx={{
                                mt: 3,
                                width: "100%",
                                backgroundColor: "#003f8c",
                            }}
                            onClick={handleLogin}
                        >
                            Se connecter
                        </Button>
                    </Paper>
                </Box>
                : props.children
            }
        </div>
    )
}
