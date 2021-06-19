import React from "react";

const CartContext = React.createContext({
  cartList: [],
  didCartChanged: false,
  addFn: () => {},
  removeFn: () => {},
});

export default CartContext;
