import React, { useContext, useState } from "react";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";
function Cart(props) {
  const cartCtx = useContext(CartContext);
  const totalAmt = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemremoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemaddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const submitOrderHandler = (userData) => {
    fetch('https://https-req-default-rtdb.firebaseio.com/orders.json' , {
      method : 'POST' ,
      body : JSON.stringify({
        user : userData ,
        orderedItems : cartCtx.items
      })
    });
  }

  const [showCheckout, setShowCheckout] = useState(false);
  return (
    <Modal onHideCart={props.onHideCart}>
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemremoveHandler.bind(null, item.id)}
            onAdd={cartItemaddHandler.bind(null, item)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmt}</span>
      </div>
      {showCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart}/>}
      {!showCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems && (
            <button
              className={classes.button}
              onClick={() => setShowCheckout(true)}
            >
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
}

export default Cart;
