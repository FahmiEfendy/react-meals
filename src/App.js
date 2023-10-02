import { useState } from "react";

import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart/Cart";
import Header from "./components/Layout/Header/Header";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCartHandler = () => {
    setIsCartOpen(true);
  };

  const closeCartHandler = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      {isCartOpen && <Cart closeCartHandler={closeCartHandler} />}
      <Header openCartHandler={openCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
