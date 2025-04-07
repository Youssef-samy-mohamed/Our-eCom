import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../index"

const getCartTotalQuanitySelector = createSelector ((state: RootState) => state.cart.items , (items) => {
    const totalQuanity = Object.values(items).reduce((accumulator, currentValue) => accumulator + currentValue , 0)
    return totalQuanity;
})

export {getCartTotalQuanitySelector}