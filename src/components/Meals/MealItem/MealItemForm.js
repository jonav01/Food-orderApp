import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
function MealItemForm(props) {
  const amountinputRef = useRef();
  const [err , setErr]=useState(true)
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = +amountinputRef.current.value;  
    if (enteredAmount < 1 || enteredAmount > 5) {
      setErr(false)
      return;
    }
    
    props.onAddToCart(enteredAmount)
    
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountinputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">Add</button>
      {
        !err && <p>Please enter a valid amount(1-5).</p>
      }
    </form>
  );
}

export default MealItemForm;
