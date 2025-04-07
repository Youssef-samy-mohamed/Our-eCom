import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { getCartTotalQuanitySelector  } from "./selectors";
import { isString, TProduct, TLoading } from "../../types/index";

interface ICartState {
  items: { [key: string]: number }; // why i use object >> With an object, you can directly access any product's quantity using its ID without looping through an array // called index signature
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}


const initialState: ICartState = {
        items: {},
        productsFullInfo: [],
        loading: "idle",
        error: null
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id = action.payload;
            if (state.items[id]) {
                state.items[id] += 1;
            } else {
                state.items[id] = 1;
            }
    },
    cartItemChangeQuantity: (state, action) => {
        state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
        delete state.items[action.payload]
        state.productsFullInfo = state.productsFullInfo.filter((el) => el.id !== action.payload); // to make hime remvoe one product and return the rest of the products
    },
    cleanCartProductsFullInfo: (state) => {
        state.productsFullInfo = [];
    }
    ,clearCartAfterPlaceOrder: (state) => {
        state.items = {};
        state.productsFullInfo = [];
}

},

extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending,(state) =>{
        state.loading = "pending";
        state.error = null;

    })
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });

    builder.addCase(actGetProductsByItems.rejected, (state , action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
            state.error = action.payload;
        }
    });
}
})

export {
  actGetProductsByItems,
  getCartTotalQuanitySelector,
};

export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
  clearCartAfterPlaceOrder,
} = cartSlice.actions;
export default cartSlice.reducer;