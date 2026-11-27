import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { CustomerRefund, CustomerRefundData, GetCustomerRefundData } from "./RefundCustomerModels";
import { APILink } from "../../../assets/Links/LinksComponents";


let initial : GetCustomerRefundData = {
    RefundCustomerData : undefined,
    RefundStatus : "loading"
}

export const getRefundCustomerData = createAsyncThunk(CustomerRefund.CustomerRefund, async(data:string)=> {
    const tokanData = {
        username: 'travobuddyapi',
        password: 'travobuddyapi@129476',
    }
    const Tokan = await axios.post(`${APILink.API}verify`, tokanData)
    const header = {
        Authorization: `Bearer ${Tokan.data.token}`,
        'Content-Type': 'application/json'
    }
    const responce = await axios.get<CustomerRefundData>(`${APILink.API}customerridebyflag/${data}`, {headers: header})
    if(responce){
        return responce.data;
    }
})

const RefundCustomersSlice = createSlice({
    name : CustomerRefund.CustomerRefund,
    initialState : initial,
    reducers: {

    },
    extraReducers : (builder)=> {
        builder
        .addCase(getRefundCustomerData.pending, (state)=>{
            state.RefundStatus = "loading"
        })
        .addCase(getRefundCustomerData.fulfilled, (state, action)=>{
            state.RefundCustomerData = undefined
            state.RefundCustomerData = action.payload;
            state.RefundStatus = "idel"
        })
        .addCase(getRefundCustomerData.rejected, (state)=>{
            state.RefundStatus = "Error"
        })
    }
})

// export const {resateData} = RefundCustomersSlice.actions;
export default RefundCustomersSlice.reducer; 