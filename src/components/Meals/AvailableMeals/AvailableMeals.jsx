import { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import MealItem from "../MealList/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchRequest = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://react-meals-10119-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
        );
        const responseData = await response.json();
        setMeals(responseData);
      } catch (err) {
        setErrorMessage(err.message);
      }

      setIsLoading(false);
    };
    fetchRequest();
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading ? (
          <h3 className={classes["text-center"]}>Loading...</h3>
        ) : errorMessage ? (
          <h3 className={`${classes["text-center"]} ${classes["text-red"]}`}>
            {errorMessage}.
          </h3>
        ) : meals.length === 0 ? (
          <h2 className={classes["text-center"]}>No Meals Available!</h2>
        ) : (
          <ul>
            {meals.map((data) => (
              <MealItem
                id={data.id}
                key={data.id}
                name={data.name}
                description={data.description}
                price={data.price}
              />
            ))}
          </ul>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
