import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import axios from "axios";
import { TProduct } from "../../../types/product";
import axiosErrorHandler from "src/utils/axiosErrorHandler";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems", // prefix to define action types
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue, signal } = thunkAPI;
    const { cart } = getState() as RootState; // to define the state type

    const itemsId = Object.keys(cart.items); // Extracts the keys (product IDs) from the cart items object and stores them in an array.

    if (!itemsId.length) {
      return fulfillWithValue([]);
    }

    try {
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join("&");

      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}` , {signal});
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByItems;
