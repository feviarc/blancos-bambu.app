export interface Reseller {
    id: string;
    firstName: string;
    lastNameF: string;
    lastNameM: string;
    address?: { 
        state: string,
        city: string, 
        suburb?: string, 
        zipCode?: string, 
        street: string, 
        extNumber: string, 
        intNumber?: string
    };
    email?: string;
    homePhone?: string;
    mobilePhone?: string;
}
