import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { updateVendorDataResponce, updateVendorDataStatus, UpdateVendorDetails } from "./ManageValidationModels";
import { APILink } from "../../../assets/Links/LinksComponents";


let initial : updateVendorDataStatus = {
    updateVendorData : undefined ,
    updateStatus : false,
}

export const ManageValidationStatus = createAsyncThunk(UpdateVendorDetails.UpdateActiveVendors, async(data:{})=> {
    const tokanData = {
        username: 'travobuddyapi',
        password: 'travobuddyapi@129476',
    }
    const Tokan = await axios.post(`${APILink.API}verify`, tokanData)
    const header = {
        Authorization: `Bearer ${Tokan.data.token}`,
        'Content-Type': 'application/json'
    }
    const responce = await axios.put<updateVendorDataResponce>(`${APILink.API}updatevendordoc`,data, {headers: header})
    if(responce){
        // console.log(responce.status)
        return responce.data
    } 
})

const ManageValidationSlice = createSlice({
    name : UpdateVendorDetails.UpdateActiveVendors,
    initialState : initial ,
    reducers: {

    },
    extraReducers : (builder)=> {
        builder
        .addCase(ManageValidationStatus.pending, (state)=>{
            state.updateStatus = true
            state.updateVendorData = "loading"
        })
        .addCase(ManageValidationStatus.fulfilled, (state, action)=>{
            state.updateStatus = false
            state.updateVendorData = "idel"
        })
        .addCase(ManageValidationStatus.rejected, (state)=>{
            state.updateStatus = false
            state.updateVendorData = "error"
        })
    }
})

// export const {resateData} = VerifiedVendorsSlice.actions;
export default ManageValidationSlice.reducer; 