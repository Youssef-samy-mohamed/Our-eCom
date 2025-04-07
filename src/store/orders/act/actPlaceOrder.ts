import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../index";


const actPlaceOrder = createAsyncThunk(
    "orders/actPlaceOrder",
    async (subtotal:number, thunkAPI) => {

        const { rejectWithValue } = thunkAPI;
        const { cart  , auth} = thunkAPI.getState() as RootState;

        const orderItems = cart.productsFullInfo.map((el) => ({
            id: el.id,
            title: el.title,
            price: el.price,
            img: el.img,
            quantity: cart.items[el.id],
        }));

        try {
            const response = await axios.post("/orders" , {items:orderItems , subtotal , userId : auth.user?.id});
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actPlaceOrder;
