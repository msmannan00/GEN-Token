export type transaction_model = transaction[]

export interface transaction {
    _id: string
    id: string
    receiver: string
    sender: string
    totalAmount: number
    transaction: Transaction[]
}

export interface Transaction {
    id: number
    paidAmount: number
    parentId: number
}
