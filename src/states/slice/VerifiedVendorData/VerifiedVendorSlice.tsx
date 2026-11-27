import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { GetVendorData, GetVendorDataDetails, GetVendorDataResponse } from "./VerifiedVendorModels";
import { APILink } from "../../../assets/Links/LinksComponents";

let initial : GetVendorDataResponse = {
    verifiedVendorData : undefined,
    verifiedStatus : "loading"
}

export const getVerifiedVendorData = createAsyncThunk(GetVendorDataDetails.ActiveVendors, async(data:Boolean)=> {
    const tokanData = {
        username: 'travobuddyapi',
        password: 'travobuddyapi@129476',
    }
    const Tokan = await axios.post(`${APILink.API}verify`, tokanData)
    const header = {
        Authorization: `Bearer ${Tokan.data.token}`,
        'Content-Type': 'application/json'
    }
    const responce = await axios.get<GetVendorData>(`${APILink.API}vendorverification/${data}`, {headers: header})
    if(responce){
        return responce.data;
    }
})

const VerifiedVendorsSlice = createSlice({
    name : GetVendorDataDetails.ActiveVendors,
    initialState : initial,
    reducers: {

    },
    extraReducers : (builder)=> {
        builder
        .addCase(getVerifiedVendorData.pending, (state)=>{
            state.verifiedStatus = "loading"
        })
        .addCase(getVerifiedVendorData.fulfilled, (state, action)=>{
            state.verifiedVendorData = undefined;
            state.verifiedVendorData = action.payload;
            state.verifiedStatus = "idel"
        })
        .addCase(getVerifiedVendorData.rejected, (state)=>{
            state.verifiedStatus = "error"
        })
    }
})

// export const {resateData} = VerifiedVendorsSlice.actions;
export default VerifiedVendorsSlice.reducer; 