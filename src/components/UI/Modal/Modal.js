import { Fragment } from "react-is";
import Card from "../Card/Card";
import styles from "./modal.module.css";

const Modal = (props) => {
  return (
    <Fragment>
      <div
        className={styles.overlay}
        onClick={() => {
          props.showModalHandler(false);
        }}
      ></div>
      <Card className={`${styles.modal_container} ${props.className}`}>
        {props.children}
      </Card>
    </Fragment>
  );
};

export default Modal;
