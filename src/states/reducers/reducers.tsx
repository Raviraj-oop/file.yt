import { combineReducers } from "@reduxjs/toolkit"
import verifiedVendorSlice from "../slice/VerifiedVendorData/VerifiedVendorSlice"
import manageValidationSlice from "../slice/VendorValidationStatus/ManageValidation";
import refundCustomerSlice from "../slice/RefundCustomerData/RefundCustomerSlice";
import unverifiedVendorSlice from "../slice/UnverifiedVendorData/UnverifiedVendorSlice";
// import initiateCustomerRefundSlice from "../slice/InitiateCustomerRefund/InitiateCustomerRefundSlice";

const rootReducers = combineReducers({
    verifiedVendorsReducer: verifiedVendorSlice,
    unverifiedVendorReducer: unverifiedVendorSlice,
    ManageValidationReducer: manageValidationSlice,
    RefundCustomerReducer: refundCustomerSlice,
    // InitiateCustomerRefundReducer : initiateCustomerRefundSlice
})

export type RootState = ReturnType<typeof rootReducers>;

export default rootReducers;