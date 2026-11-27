export enum ESetCustomerRefund {
    setCustomerRefund = "SetCustomerRefund"
}
export interface SetCustomerRefundData {
    data : [],
    message : string,
    responseCode : number,
    status : string,
}
export interface SetCustomerRefund {
    InitiateRefundCustomerData: SetCustomerRefundData | undefined ;
    InitiateRefundStatus: string;
}
