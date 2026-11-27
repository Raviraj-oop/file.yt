import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { ESetCustomerRefund, SetCustomerRefund, SetCustomerRefundData } from "./InitiateCustomerRefundModels";


let initial : SetCustomerRefund = {
    InitiateRefundCustomerData : undefined,
    InitiateRefundStatus : "loading"
}

// export const InitiateCustomerRefund = createAsyncThunk(ESetCustomerRefund.setCustomerRefund, async(data:string)=> {
//     const tokanData = {
//         username: 'travobuddyapi',
//         password: 'travobuddyapi@129476',
//     }
//     const Tokan = await axios.post("http://3.110.215.154:8080/v1/verify", tokanData)
//     const header = {
//         Authorization: `Bearer ${Tokan.data.token}`,
//         'Content-Type': 'application/json'
//     }
//     const responce = await axios.get<SetCustomerRefundData>(`http://3.110.215.154:8080/v1/customerridebyflag/${data}`, {headers: header})
//     if(responce){
//         return responce.data;
//     }
// })

const InitiateCustomerRefundSlice = createSlice({
    name : ESetCustomerRefund.setCustomerRefund,
    initialState : initial,
    reducers: {

    },
    // extraReducers : (builder)=> {
    //     builder
    //     .addCase(InitiateCustomerRefund.pending, (state)=>{
    //         state.RefundStatus = "loading"
    //     })
    //     .addCase(InitiateCustomerRefund.fulfilled, (state, action)=>{
    //         state.RefundCustomerData = undefined
    //         state.RefundCustomerData = action.payload;
    //         state.RefundStatus = "idel"
    //     })
    //     .addCase(InitiateCustomerRefund.rejected, (state)=>{
    //         state.RefundStatus = "Error"
    //     })
    // }
})

// export const {resateData} = RefundCustomersSlice.actions;
export default InitiateCustomerRefundSlice.reducer; 