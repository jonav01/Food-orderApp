import React, { useContext } from "react";
import CartContext from "../../store/CartContext";
import classes from './MealItem.module.css'
import MealItemForm from "./MealItemForm";
function MealItem(props) {
  const price = `$${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext)
  const addtoCart = amt => {
    cartCtx.addItem({
      id:props.id,
      name:props.name,
      amount:amt, 
      price:props.price
    });
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.desc}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addtoCart}/>
      </div>
    </li>
  );
}

export default MealItem;
