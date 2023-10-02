import classes from "./Header.module.css";
import mealsImage from "../../../assets/meals.jpg";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton openCartHandler={props.openCartHandler} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Meals" />
      </div>
    </>
  );
};

export default Header;
