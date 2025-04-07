import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { RootState } from "../../index";
import { TOrderItem } from "@customTypes/order.type";


type TRespone = TOrderItem[];


const actGetOrders = createAsyncThunk(
    "orders/actGetOrders",
    async (_, thunkAPI) => {
        const { rejectWithValue , getState , signal } = thunkAPI; // don't forget that we're using signal for the abort state
        const { auth } = getState() as RootState;
        try {
            const response = await axios.get<TRespone>(`/orders?userId=${auth.user?.id}`, { signal });
            return response.data;



            
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetOrders

