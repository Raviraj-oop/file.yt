export enum UpdateVendorDetails {
    UpdateActiveVendors = "UpdateActiveVendors"
}
export interface updateVendorDataResponce {
    data : [],
    message : string,
    responseCode : number,
    status : string,
}
export interface updateVendorDataStatus {
    updateVendorData: string | undefined ;
    updateStatus: boolean;
}
