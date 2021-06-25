import { useState, useRef } from "react";
import Button from "../UI/Button/Button";
import styles from "./CheckoutForm.module.css";

const CheckoutForm = (props) => {
  const [errorState, setErrors] = useState({
    nameError: "",
    phoneError: "",
    addressError: "",
    contactNoError: "",
    codeError: "",
  });
  const inputName = useRef();
  const inputPhone = useRef();
  const inputAddress = useRef();
  const inputCity = useRef();
  const inputCode = useRef();

  const formHandler = (e) => {
    e.preventDefault();

    if (
      inputName.current.value !== "" &&
      inputAddress.current.value !== "" &&
      inputPhone.current.value !== "" &&
      inputCity.current.value !== "" &&
      inputCode.current.value !== ""
    )
      props.sendData({
        userDetails: {
          name: inputName.current.value,
          address: inputAddress.current.value,
          contactNo: inputPhone.current.value,
          city: inputCity.current.value,
          code: inputCode.current.value,
        },
      });
    else alert("Please Fill all the details!");
  };

  return (
    <form
      noValidate={false}
      onSubmit={formHandler}
      className={styles.form_container}
    >
      <h2>Checkout Form</h2>
      <div className={styles.form}>
        <label htmlFor="Name">Full Name</label>
        <input
          type="text"
          ref={inputName}
          id="Name"
          className={styles.inputBlock}
          required={true}
        />
        <label htmlFor="Phone">Contact no</label>
        <input
          type="number"
          ref={inputPhone}
          id="phone"
          className={styles.inputBlock}
          required={true}
        />
        <label htmlFor="address">Address</label>
        <textarea id="address" ref={inputAddress} cols="20" rows="5"></textarea>
        <label htmlFor="city">City</label>
        <input
          type="tel"
          ref={inputCity}
          id="city"
          className={styles.inputBlock}
          required={true}
        />
        <label htmlFor="postal code">Pin Code</label>
        <input
          type="tel"
          ref={inputCode}
          id="postal code"
          className={styles.inputBlock}
          required={true}
        />
      </div>
      <Button onClick={formHandler} className={styles.form__button}>
        Confirm order
      </Button>
    </form>
  );
};

export default CheckoutForm;
