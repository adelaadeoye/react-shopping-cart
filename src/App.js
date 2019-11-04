import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

//Context
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { useLocalStorage } from "./components/useLocalStorage";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useLocalStorage("data",[]);

  const addItem = item => {
    // add the given item to the cart

    const newCartItem = {
      id: new Date(),
      title: item.title,
      price: item.price,
      image: item.image
    };

    setCart([...cart, newCartItem]);
  };

  const removeItem = productID => {
    const newCart = cart.filter(item => item.id !== productID);
    setCart(newCart);
    console.log(productID);
  };
  return (
    <>

      <div className="App">
        <ProductContext.Provider value={{ products, addItem }}>
          <CartContext.Provider value={{ removeItem, cart }}>
            <Navigation />

            {/* Routes */}
            <Route exact path="/" component={Products} />

            <Route path="/cart" component={ShoppingCart} />
          </CartContext.Provider>
        </ProductContext.Provider>
      </div>
    </>
  );
}

export default App;
