import { useReducer } from "react";

import CartContext from "./cart-context";

// Reducer function
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingMeal = state.items.find(
      (item) => item.id === action.payload.id
    );

    const updatedTotalAmount =
      state.totalAmount + action.payload.amount * action.payload.price;

    if (existingMeal) {
      existingMeal.amount += 1;
      return {
        items: [...state.items],
        totalAmount: updatedTotalAmount,
      };
    }
    return {
      items: [...state.items, action.payload],
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE_ITEM") {
    const existingMeal = state.items.find((item) => item.id === action.id);

    if (existingMeal.amount > 1) {
      existingMeal.amount -= 1;
      return {
        items: [...state.items],
        totalAmount: state.totalAmount - existingMeal.price,
      };
    }

    return {
      items: [...state.items.filter((item) => item.id !== action.id)],
      totalAmount: state.totalAmount - existingMeal.price,
    };
  }
};

// Cart initial state
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addHandler = (item) => {
    dispatchCart({ type: "ADD_ITEM", payload: item });
  };

  const removeHandler = (id) => {
    dispatchCart({ type: "REMOVE_ITEM", id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addHandler,
    removeItem: removeHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
