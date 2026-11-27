export enum GetUnverifiedVendorDataDetails {
    ActiveVendors = "UnverifiedVendors"
}
export interface GetUnverifiedVendorData {
    data : [],
    message : string,
    responseCode : number,
    status : string,
}
export interface GetUnverifiedVendorDataResponse {
    UnverifiedVendorData: GetUnverifiedVendorData | undefined ;
    UnverifiedStatus: string | null;
}