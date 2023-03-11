import {Member} from "../api/members";
import React, {createContext, useContext, useState} from "react";
import {AppContext} from "./AppContext";

type Output = {
    user?: Member | undefined
    login: (paypal: string) => Promise<void>
    logout: () => void
}

// @ts-ignore
export const UserContext = createContext<Output>({})

type Props = {
    children?: any
}
export const UserContextProvider: React.FC<Props> = (props: Props) => {

    const context = useContext(AppContext)
    const [user, setUser] = useState<Member | undefined>(undefined)

    const login = async (paypal: string) => {
        const member = await context.getMemberByPaypal(paypal)
        setUser(member)
    }

    const logout = () => {
        setUser(undefined)
    }

    return (
        <UserContext.Provider value={{
            user: user,
            login: login,
            logout: logout,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
