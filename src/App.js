import React, { useState, useReducer } from "react";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContext from "./Context/CartContext";

const cartReducer = (prevState, action) => {
  if (action.type === "ADD") {
    return {
      cartItems: [action.value, ...prevState.cartItems],
      didCardChanged: true,
    };
  }
  if (action.type === "REMOVE") {
    const index = action.value.findIndex((item) => item.id === action.id);
    action.value.splice(index, 1);

    return {
      cartItems: [...action.value],
      didCardChanged: false,
    };
  }
};

function App() {
  const [showModal, setModal] = useState(false);

  const [cartInfo, dispatchCart] = useReducer(cartReducer, {
    cartItems: [],
    didCardChanged: false,
  });

  // to show modal
  const ModalHandler = (flag) => {
    setModal(flag);
  };

  // to add to cart
  const addToCart = (newItem) => {
    dispatchCart({
      type: "ADD",
      value: newItem,
    });
  };

  // to remove from cart
  const removeFromCart = (id, data) => {
    dispatchCart({
      type: "REMOVE",
      value: data,
      id: id,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartList: cartInfo.cartItems,

        addFn: addToCart,
        removeFn: removeFromCart,
      }}
    >
      {showModal ? <Cart showModalHandler={ModalHandler}></Cart> : ""}
      <Header showModalHandler={ModalHandler} />
      <Meals />
    </CartContext.Provider>
  );
}

export default App;
