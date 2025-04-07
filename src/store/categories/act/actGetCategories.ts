import { createAsyncThunk } from "@reduxjs/toolkit"; // this is thunk page
import axios from "axios";
import { TCategory } from "../../../types/category";
import axiosErrorHandler from "src/utils/axiosErrorHandler";

type TResponse = TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue , signal } = thunkAPI;
    try {
      const response = await axios.get<TResponse>("/category" , { signal });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetCategories;
