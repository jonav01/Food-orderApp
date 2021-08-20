import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";


function AvailableMeals() {
  const [meals , setMeals] = useState([]);
  const [isLoading ,setLoading] = useState(true);
  const [error , setIsError]=useState(false);
  const fetchMeals = async() => {
    try{
      const res = await fetch('https://https-req-default-rtdb.firebaseio.com/meals.json');
      const resData = await res.json();
      if(!res.ok)
      {
        throw new Error('There is something fishy !');
      }
      
      const loadedMeals = [];
      for (const key in resData)
      {
        loadedMeals.push({
          id: key ,
          name : resData[key].Name ,
          description: resData[key].description,
          price:resData[key].price
        })
      }
      setMeals(loadedMeals);
      setLoading(false);
    }catch(err){
        setLoading(false);
        setIsError(err.message);
        console.log(err);
    }
  }
  useEffect(()=> {
    fetchMeals();
  } ,[]);
  return (
    <section className={classes.meals}>
      <Card>
      {isLoading && <p>Loading ..</p>}
      {error && <p>{error}</p>}
        <ul>
          {meals.map((data) => (
            <MealItem
              id={data.id}
              key={data.id}
              name={data.Name}
              desc={data.description}
              price={data.price}
            />
          ))}

        </ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
