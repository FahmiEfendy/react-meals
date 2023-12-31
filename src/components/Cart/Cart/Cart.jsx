import { useContext, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../../UI/Modal/Modal";
import CartItem from "../CartItem/CartItem";
import Checkout from "../Checkout/Checkout";
import CartContext from "../../../store/cart-context";

const Cart = (props) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const cartCtx = useContext(CartContext);

  const fixedTotalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const confirmHandler = () => setIsFormOpen(true);

  return (
    <Modal closeCartHandler={props.closeCartHandler}>
      {isFormOpen ? (
        <Checkout
          setIsFormOpen={setIsFormOpen}
          closeCartHandler={props.closeCartHandler}
        />
      ) : cartCtx.items.length > 0 ? (
        <>
          <ul className={classes["cart-items"]}>
            {cartCtx.items.map((data) => {
              return (
                <CartItem
                  key={data.id}
                  id={data.id}
                  name={data.name}
                  price={data.price}
                  amount={data.amount}
                />
              );
            })}
          </ul>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{fixedTotalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button
              className={classes["button-alt"]}
              onClick={props.closeCartHandler}
            >
              Close
            </button>
            <button className={classes.button} onClick={confirmHandler}>
              Confirm
            </button>
          </div>
        </>
      ) : (
        <h3 className={classes.empty}>Your Cart is Empty!</h3>
      )}
    </Modal>
  );
};

export default Cart;
