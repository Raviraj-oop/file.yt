import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { GetUnverifiedVendorData, GetUnverifiedVendorDataDetails, GetUnverifiedVendorDataResponse } from "./UnerifiedVendorModels";
import { APILink } from "../../../assets/Links/LinksComponents";

let initial : GetUnverifiedVendorDataResponse = {
    UnverifiedVendorData : undefined,
    UnverifiedStatus : "loading"
}

export const getUnverifiedVendorData = createAsyncThunk(GetUnverifiedVendorDataDetails.ActiveVendors, async(data:Boolean)=> {
    const tokanData = {
        username: 'travobuddyapi',
        password: 'travobuddyapi@129476',
    }
    const Tokan = await axios.post(`${APILink.API}verify`, tokanData)
    // console.log("Tokan", Tokan)
    const header = {
        Authorization: `Bearer ${Tokan.data.token}`,
        'Content-Type': 'application/json'
    }
    const responce = await axios.get<GetUnverifiedVendorData>(`${APILink.API}vendorverification/${data}`, {headers: header})
    if(responce){
        return responce.data;
    }
})

const UnverifiedVendorsSlice = createSlice({
    name : GetUnverifiedVendorDataDetails.ActiveVendors,
    initialState : initial,
    reducers: {

    },
    extraReducers : (builder)=> {
        builder
        .addCase(getUnverifiedVendorData.pending, (state)=>{
            state.UnverifiedStatus = "loading"
        })
        .addCase(getUnverifiedVendorData.fulfilled, (state, action)=>{
            state.UnverifiedVendorData = undefined;
            state.UnverifiedVendorData = action.payload;
            state.UnverifiedStatus = "idel"
        })
        .addCase(getUnverifiedVendorData.rejected, (state)=>{
            state.UnverifiedStatus = "error"
        })
    }
})

// export const {resateData} = UnverifiedVendorsSlice.actions;
export default UnverifiedVendorsSlice.reducer; 