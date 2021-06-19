import { useContext } from "react";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import style from "./Cart.module.css";
import CartContext from "../../Context/CartContext";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const data = cartContext.cartList;

  const BuyCartItem = () => {
    setTimeout(() => {
      cartContext.removeFn("", []);
    }, 1000);
  };

  const cancelDataItem = (id) => {
    cartContext.removeFn(id, data);
    cartContext.didCartChanged = "yes";
  };

  let cartItemList = <p>No Items in cart yet !</p>;

  if (data.length > 0)
    cartItemList = (
      <ul className={style.cartItemList}>
        <h3>Your Cart</h3>
        {data.map((item) => (
          <li key={item.id} className={style.cartItem}>
            <div className={style.cartItem__title}>{item.name}</div>
            <div className={style.cartItem__price}>{item.total} $</div>
            <div className={style.cartItem__quantity}>
              Quantity- {item.quantity}
            </div>
            <Button
              className={style.cancelBtn}
              onClick={() => {
                cancelDataItem(item.id);
              }}
            >
              Cancel Item
            </Button>
          </li>
        ))}
      </ul>
    );

  return (
    <Modal
      className={style.cart__container}
      showModalHandler={props.showModalHandler}
    >
      {data.length > 0 ? (
        <div className={style.cart_details}>
          <div className={style.cart__total}>
            Total{" "}
            <span>
              {data.reduce((sum, cur) => {
                return Math.round((sum += cur.total));
              }, 0)}
              $
            </span>
          </div>
          <Button className={style.cart_buyBtn} onClick={BuyCartItem}>
            Order{" "}
            <span>{`[ ${data.length} ${
              data.length > 1 ? "items" : "item"
            }]`}</span>{" "}
          </Button>
        </div>
      ) : (
        ""
      )}
      {cartItemList}
      <div className={style.cart_actions}>
        <Button
          className={style.cart_CloseBtn}
          onClick={() => {
            props.showModalHandler(false);
          }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default Cart;
