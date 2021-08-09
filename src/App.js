import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./components/store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);

  const handleCart = () => {
    setShowCart(!showCart);
  };
  
  return (
    <CartProvider>
      {showCart && <Cart onHideCart={handleCart} />}
      <Header onShowCart={handleCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
