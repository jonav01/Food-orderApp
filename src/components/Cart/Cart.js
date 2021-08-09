import React, { useContext } from "react";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
function Cart(props) {
  const cartCtx = useContext(CartContext);
  const totalAmt = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemremoveHandler = (id) => {
      cartCtx.removeItem(id);
  }
  const cartItemaddHandler = (item) => {
      cartCtx.addItem(item);
  }
  return (
    <Modal onHideCart={props.onHideCart}>
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemremoveHandler.bind(null , item.id)}
            onAdd={cartItemaddHandler.bind(null,item)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmt}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
