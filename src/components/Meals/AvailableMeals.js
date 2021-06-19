import { useContext, useState } from "react";
import CartContext from "../../Context/CartContext";
import style from "./AvailableMeals.module.css";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
    quantity: 1,
    total: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
    quantity: 1,
    total: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
    quantity: 1,
    total: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
    quantity: 1,
    total: 18.99,
  },
];

const AvailableMeals = (props) => {
  const cartContextArr = useContext(CartContext);
  let [menuList, updateMenu] = useState(DUMMY_MEALS);
  let [cartList, updateCart] = useState([]);

  const sendMealData = (id) => {
    const selectedItem = DUMMY_MEALS.filter((item) => item.id === id);

    updateCart(...selectedItem);
    cartContextArr.cartList.unshift(...selectedItem);
    cartContextArr.CartState(id);
  };

  const incrementQuantity = (id) => {
    const selectedItem = menuList.map((item) => {
      if (item.id === id && item.quantity > 0) {
        item.quantity++;
        item.total = +item.price * +item.quantity;
      }
      return item;
    });
    updateMenu(selectedItem);
  };

  const decrementQuantity = (id) => {
    const selectedItem = menuList.map((item) => {
      if (item.id === id && item.quantity > 1) {
        item.quantity--;
        item.total = +item.price * +item.quantity;
      }
      return item;
    });
    updateMenu(selectedItem);
  };

  const mealList = DUMMY_MEALS.map((meal) => (
    <li key={meal.id}>
      <div className={style.meal_item}>
        <div className={style.meal__info}>
          <div className={style.meal__title}>{meal.name}</div>
          <div className={style.meal__details}>{meal.description}</div>
          <div className={style.meal__price}>{meal.price}</div>
        </div>
        <div className={style.meal_controls}>
          <div className={style.meal__counterButtons}>
            <Button
              className={style.meal__counterBtn}
              onClick={() => {
                decrementQuantity(meal.id);
              }}
            >
              -
            </Button>
            <div className={style.meal__displayCounter}>{meal.quantity}</div>
            <Button
              className={style.meal__counterBtn}
              onClick={() => {
                incrementQuantity(meal.id);
              }}
            >
              +
            </Button>
          </div>
          <Button
            type={"submit"}
            className={style.meal__addToBtn}
            onClick={() => {
              sendMealData(meal.id);
            }}
          >
            + Add
          </Button>
        </div>
      </div>
    </li>
  ));

  return (
    <Card className={style.meals}>
      <ul>{mealList}</ul>
    </Card>
  );
};

export default AvailableMeals;
