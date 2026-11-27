import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { CustomerData, ECustomerData, GetCustomerData } from "./CustomerModels";
import { APILink } from "../../../assets/Links/LinksComponents";


let initial : GetCustomerData = {
    AllCustomerData : undefined,
    AllCustomerDataStatus : "loading"
}

export const getCustomerData = createAsyncThunk(ECustomerData.getCustomer, async()=> {
    const tokanData = {
        username: 'travobuddyapi',
        password: 'travobuddyapi@129476',
    }
    const Tokan = await axios.post(`${APILink.API}verify`, tokanData)
    const header = {
        Authorization: `Bearer ${Tokan.data.token}`,
        'Content-Type': 'application/json'
    }
    const responce = await axios.get<CustomerData>(`${APILink.API}customers`, {headers: header})
    if(responce){
        return responce.data;
    }
})

const CustomersDataSlice = createSlice({
    name : ECustomerData.getCustomer,
    initialState : initial,
    reducers: {

    },
    extraReducers : (builder)=> {
        builder
        .addCase(getCustomerData.pending, (state)=>{
            state.AllCustomerDataStatus = "loading"
        })
        .addCase(getCustomerData.fulfilled, (state, action)=>{
            state.AllCustomerData = undefined
            state.AllCustomerData = action.payload;
            state.AllCustomerDataStatus = "idel"
        })
        .addCase(getCustomerData.rejected, (state)=>{
            state.AllCustomerDataStatus = "Error"
        })
    }
})

// export const {resateData} = RefundCustomersSlice.actions;
export default CustomersDataSlice.reducer; 