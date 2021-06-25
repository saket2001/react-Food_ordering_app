import { useContext, useState, useEffect } from "react";
import CartContext from "../../Context/CartContext";
import style from "./AvailableMeals.module.css";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//     quantity: 1,
//     total: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//     quantity: 1,
//     total: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//     quantity: 1,
//     total: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//     quantity: 1,
//     total: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const cartContextArr = useContext(CartContext);
  let [menuList, updateMenu] = useState([]);
  const [loadState, setLoadState] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const menu = [];
      // fetching data
      const response = await fetch(
        "https://react-food-ordering23-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) return;

      const data = await response.json();

      // converting return object into array of object
      for (const i in data) {
        menu.push({
          id: i,
          name: data[i].name,
          description: data[i].description,
          price: data[i].price,
          total: data[i].price,
          quantity: 1,
        });
      }
      // set load state has false
      setLoadState(false);
      // updating menu state
      updateMenu(menu);
    };
    getData();
  }, []);

  const sendMealData = (id) => {
    const selectedItem = menuList.filter((item) => item.id === id);
    // add to cart
    cartContextArr.addFn(...selectedItem);
    cartContextArr.didCartChanged = false;
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

  const mealList = menuList.map((meal) => (
    <li key={meal.id}>
      <div className={style.meal_item}>
        <div className={style.meal__info}>
          <div className={style.meal__title}>{meal.name}</div>
          <div className={style.meal__details}>{meal.description}</div>
          <div className={style.meal__price}>{meal.price} $</div>
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
      <ul>{loadState ? <p>Getting Tasty Meals for you..</p> : mealList}</ul>
    </Card>
  );
};

export default AvailableMeals;
