import React, { useState } from "react";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContext from "./Context/CartContext";

function App() {
  const [showModal, setModal] = useState(false);
  const [cartList] = useState([]);
  const [cart, setCartState] = useState(false);

  const ModalHandler = (flag) => {
    setModal(flag);
  };

  const updatedCartState = (flag) => {
    setCartState(flag);
  };

  return (
    <CartContext.Provider
      value={{
        cartList: cartList,
        cartState: cart,
        CartState: updatedCartState,
      }}
    >
      {showModal ? <Cart showModalHandler={ModalHandler}></Cart> : ""}
      <Header showModalHandler={ModalHandler} />
      <Meals />
    </CartContext.Provider>
  );
}

export default App;
