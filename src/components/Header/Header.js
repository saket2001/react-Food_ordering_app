import Nav from "./Nav/Nav";
import styles from "./Header.module.css";
import MealImage from "./meals.jpg";
import { Fragment } from "react";

const Header = (props) => {
  return (
    <Fragment>
      <div className={styles.header_container}>
        <Nav showModalHandler={props.showModalHandler} />
        <div className={styles.main_image}>
          <img src={MealImage} alt="mealImage" />
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
