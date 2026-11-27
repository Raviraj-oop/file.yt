export enum GetVendorDataDetails {
    ActiveVendors = "ActiveVendors"
}
export interface GetVendorData {
    data : [],
    message : string,
    responseCode : number,
    status : string,
}
export interface GetVendorDataResponse {
    verifiedVendorData: GetVendorData | undefined ;
    verifiedStatus: string | null;
}