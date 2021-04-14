export interface Order {
    id: string;
    product: { id: string, brandCode?: string, name: string };
    reseller: { id: string, name: string };
    date: Date;
    amount: number;
    isInStore: number;
    delivered: {status: boolean, date?: Date};
    comments?: string;
}
