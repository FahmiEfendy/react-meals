import { useContext } from "react";
import classes from "./CartItem.module.css";

import CartContext from "../../../store/cart-context";

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addItemHandler = () => {
    const newItem = {
      id: props.id,
      name: props.name,
      description: props.description,
      price: +props.price,
      amount: 1,
    };

    cartCtx.addItem(newItem);
  };

  const removeItemHandler = () => {
    cartCtx.removeItem(props.id);
  };

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeItemHandler}>−</button>
        <button onClick={addItemHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
