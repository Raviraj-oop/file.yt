export enum CustomerRefund {
    CustomerRefund = "CustomerRefund"
}
export interface CustomerRefundData {
    data : [],
    message : string,
    responseCode : number,
    status : string,
}
export interface GetCustomerRefundData {
    RefundCustomerData: CustomerRefundData | undefined ;
    RefundStatus: string;
}
