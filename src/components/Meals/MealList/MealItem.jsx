import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContex from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContex);

  const price = `$${props.price.toFixed(2)}`;

  const addItemHandler = (amount) => {
    const newItem = {
      id: props.id,
      name: props.name,
      description: props.description,
      price: +props.price,
      amount: +amount,
    };

    cartCtx.addItem(newItem);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} addItemHandler={addItemHandler} />
      </div>
    </li>
  );
};

export default MealItem;
