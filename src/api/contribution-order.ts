import contributionOrders from "../data/contribution-order.json"

export type ContributionOrder = {
    id: string,
    order: string,
    memberId: string
}

export const getAllContributionOrderAPI = async (): Promise<ContributionOrder[]> => {
    return contributionOrders
}
