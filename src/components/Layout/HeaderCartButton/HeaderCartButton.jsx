import { useContext, useEffect, useState } from "react";

import CartIcon from "../../../assets/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const [isBtnAnimated, setIsBtnAnimated] = useState(false);

  const totalItem = cartCtx.items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${
    isBtnAnimated ? classes.bump : ""
  }`;

  useEffect(() => {
    if (totalItem === 0) return;
    setIsBtnAnimated(true);

    const timer = setTimeout(() => {
      setIsBtnAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [totalItem]);

  return (
    <button className={buttonClasses} onClick={props.openCartHandler}>
      <CartIcon className={classes.icon} />
      <span>Your Cart</span>
      <span className={classes.badge}>{totalItem}</span>
    </button>
  );
};

export default HeaderCartButton;
