import { useContext, useState } from "react";
import CartContext from "../../../Context/CartContext";
import Button from "../../UI/Button/Button";
import CartIcon from "../../UI/CartIcon/CartIcon";
import styles from "./Nav.module.css";

const Nav = (props) => {
  const cartContext = useContext(CartContext);

  const [data] = useState(cartContext.cartList);

  return (
    <div id={styles.nav_container}>
      <div id={styles.nav__logo}>React Eats</div>
      <Button
        type={"button"}
        className={styles.nav__button}
        onClick={() => props.showModalHandler(true)}
      >
        <span className={styles.cartIcon}>
          <CartIcon></CartIcon>
        </span>
        <span className={styles.button_text}>Your Cart</span>
        <span className={styles.cartBadge}>{data.length}</span>
      </Button>
    </div>
  );
};

export default Nav;
