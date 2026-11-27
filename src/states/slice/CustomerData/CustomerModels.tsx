export enum ECustomerData {
    getCustomer = "getCustomer"
}
export interface CustomerData {
    data : [],
    message : string,
    responseCode : number,
    status : string,
}
export interface GetCustomerData {
    AllCustomerData: CustomerData | undefined ;
    AllCustomerDataStatus: string;
}
