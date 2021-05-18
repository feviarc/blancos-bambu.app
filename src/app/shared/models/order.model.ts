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
        isDelivered: boolean, 
        registerDate: number,
        deliveryDate?: number
    };
    amount: number;
    isInStore: number;
    comments?: string;
}
