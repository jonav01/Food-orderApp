import { useContext, useEffect, useState } from "react";
import React from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../store/CartContext";
import classes from "./HeaderCartBtn.module.css";

function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const cartItems = cartCtx.items.reduce((curr, item) => curr + item.amount, 0);
  const [btnisHighlighted, setbtnisHiglighted] = useState(false);
  const btnClasses = `${classes.button} ${
    btnisHighlighted ? classes.bump : " "
  }`;
  const { items } = cartCtx;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setbtnisHiglighted(true);

    const timer = setTimeout(() => {
      setbtnisHiglighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{cartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
