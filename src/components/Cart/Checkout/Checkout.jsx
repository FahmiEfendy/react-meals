import { useContext, useState } from "react";

import classes from "./Checkout.module.css";
import CartContext from "../../../store/cart-context";

const isEmpty = (input) => input.trim() === "";
const isNotFiveChars = (input) => input.trim().length !== 5;

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);

  const [enteredName, setEnteredName] = useState("");
  const [enteredStreet, setEnteredStreet] = useState("");
  const [enteredPostalCode, setEnteredPostalCode] = useState("");
  const [enteredCity, setEnteredCity] = useState("");

  const [errMessage, setErrMessage] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const inputChangeHandler = (e) => {
    if (e.target.id === "name") setEnteredName(e.target.value);
    else if (e.target.id === "street") setEnteredStreet(e.target.value);
    else if (e.target.id === "postalCode") setEnteredPostalCode(e.target.value);
    else if (e.target.id === "city") setEnteredCity(e.target.value);
  };

  const closeFormHandler = () => {
    props.setIsFormOpen(false);
  };

  const orderHandler = async (e) => {
    e.preventDefault();

    setFormValidity({
      name: !isEmpty(enteredName),
      street: !isEmpty(enteredStreet),
      postalCode: !isNotFiveChars(enteredPostalCode),
      city: !isEmpty(enteredCity),
    });

    if (
      isEmpty(enteredName) ||
      isEmpty(enteredStreet) ||
      isNotFiveChars(enteredPostalCode) ||
      isEmpty(enteredCity)
    ) {
      return;
    }

    const payload = {
      user: {
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity,
      },
      order: cartCtx.items,
    };

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://react-meals-10119-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      console.log(await response.json());
    } catch (err) {
      setErrMessage(err.message);
    }

    setIsLoading(false);
    setSubmitted(true);
    cartCtx.resetItem();
  };

  const inputClasses = (inputValid) => {
    if (inputValid) return classes.control;
    return `${classes.control} ${classes.invalid}`;
  };

  return (
    <form onSubmit={orderHandler} className={classes.form}>
      {isLoading ? (
        <p className={classes["text-center"]}>Loading...</p>
      ) : errMessage ? (
        <p className={`${classes["text-center"]} ${classes.invalid}`}>
          {errMessage}
        </p>
      ) : submitted ? (
        <>
          <p className={classes["text-center"]}>Order Successful!</p>
          <div className={classes.actions}>
            <button className={classes.submit} onClick={props.closeCartHandler}>
              Close
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={inputClasses(formValidity.name)}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" onChange={inputChangeHandler} />
            {!formValidity.name && <p>Name Cannot Be Empty!</p>}
          </div>
          <div className={inputClasses(formValidity.street)}>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" onChange={inputChangeHandler} />
            {!formValidity.street && <p>Street Cannot Be Empty!</p>}
          </div>
          <div className={inputClasses(formValidity.postalCode)}>
            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" id="postalCode" onChange={inputChangeHandler} />
            {!formValidity.postalCode && (
              <p>Postal Code Must Contain 5 Characters!</p>
            )}
          </div>
          <div className={inputClasses(formValidity.city)}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" onChange={inputChangeHandler} />
            {!formValidity.city && <p>City Cannot Be Empty!</p>}
          </div>
          <div className={classes.actions}>
            <button onClick={closeFormHandler}>Back</button>
            <button type="submit" className={classes.submit}>
              Order
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default Checkout;
