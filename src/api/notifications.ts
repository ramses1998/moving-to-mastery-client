import notifications from "../data/notifications.json"

export type Notification = {
    id: string
    title: string
    content?: string,
    issuerId: string,
    creationDate: Date
}

export const getAllNotificationsAPI = async (): Promise<Notification[]> => {
    return notifications.map(n => convertToNotificationType(n))
}

const convertToNotificationType = (response: any): Notification => {
    return {
        ...response,
        creationDate: new Date(response.creationDate)
    }
}
