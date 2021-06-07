export interface Order {
    id?: string;
    reseller: {
        id: string,
        displayName: string
    };
    product: {
        id: string,
        brandCode?: string,
        name: string,
        brand: string
    };
    status: {
        deliveryAmount?: number,
        deliveryDate?: number,
        isDelivered: boolean,
        registerDate: number,
    };
    amount: number;
    isInStore: number;
    comments?: string;
}
