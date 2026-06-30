/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useState,
  useEffect,
} from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const cartKey = currentUser
    ? `cart_${currentUser.id}`
    : "cart_guest";

  const [cart, setCart] = useState(() => {

    const savedCart =
      localStorage.getItem(cartKey);

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });

  useEffect(() => {

    localStorage.setItem(
      cartKey,
      JSON.stringify(cart)
    );

  }, [cart, cartKey]);

  const addToCart = (food) => {

    const existing = cart.find(
      (item) => item.id === food.id
    );

    if (existing) {

      setCart(
        cart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...food,
          qty: 1,
        },
      ]);

    }

  };

  const increaseQty = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );

  };

  const decreaseQty = (id) => {

    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item
        )
        .filter(
          (item) => item.qty > 0
        )
    );

  };

  const removeItem = (id) => {

    setCart(
      cart.filter(
        (item) => item.id !== id
      )
    );

  };

  const clearCart = () => {

    setCart([]);

    localStorage.removeItem(
      cartKey
    );

  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}