import { createSlice } from "@reduxjs/toolkit"; 
import  actGetCategories  from "../categories/act/actGetCategories";
import { isString } from "../../types/index";



interface ICategoriesState {
    records:{id:number , title:string , prefix:string , img:string }[]
    loading: "idle" | "pending" | "failed" | "succeeded";
    error: string | null;
}


const initialState: ICategoriesState = { 
    records:  [],
    loading:"idle",
    error:null,
};


const categoriesSlice = createSlice({
  name: "categories", // Prefix for action types ----  This helps keep action types unique.
  initialState,
  reducers: {
    cleanUpCategoriesRecords: (state) => {
      state.records = [];
    }
  },
   extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null; // Reset any previous errors
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetCategories.rejected, (state , action) => {
      state.loading = "failed";
             if (isString(action.payload)) {
                state.error = action.payload;
            }
    });
}});

export { actGetCategories };
export const { cleanUpCategoriesRecords } = categoriesSlice.actions;
export default categoriesSlice.reducer;

