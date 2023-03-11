import members from "../data/members.json"

export type MaritalStatus = "SINGLE" | "MARRIED" | "DIVORCED"

export type Role = "NORMAL-USER" | "PRESIDENT" | "SECRETARY" | "CENSOR" | "ACCOUNT-COMMISSIONER" | "TREASURY-OFFICER"

export type Member = {
    id: string,
    firstName?: string,
    lastName: string,
    maritalStatus?: MaritalStatus,
    countryOfResidence?: string,
    phoneNumber?: string,
    address?: string,
    paypal?: string,
    profession?: string,
    avatar?: string,
    role: Role
}

export const getAllMembersAPI = async (): Promise<Member[]> => {
    // @ts-ignore
    return members
}

export const getMemberByIdAPI = async (id: string): Promise<Member> => {
    // @ts-ignore
    return members.find(m => m.id === id)!
}

export const getMemberByPaypalAPI = async (paypal: string): Promise<Member> => {
    // @ts-ignore
    return members.find(m => m.paypal === paypal)!
}
