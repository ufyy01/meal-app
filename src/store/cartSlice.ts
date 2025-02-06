import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
}

interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			if (existingItem) {
				existingItem.quantity += newItem.quantity;
			} else {
				state.items.push(newItem);
			}
		},

		updateCart: (state, action: PayloadAction<CartItem>) => {
			const updatedItem = action.payload;
			const index = state.items.findIndex((item) => item.id === updatedItem.id);
			if (index !== -1) {
				state.items[index] = updatedItem;
			}
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},

		changeQuantity: (
			state,
			action: PayloadAction<{ id: string; delta: number }>
		) => {
			const { id, delta } = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			if (existingItem) {
				existingItem.quantity += delta;

				if (existingItem.quantity < 1) {
					state.items = state.items.filter((item) => item.id !== id);
				}
			}
		},
	},
});

export const { addToCart, updateCart, removeFromCart, changeQuantity } =
	cartSlice.actions;
export default cartSlice.reducer;
