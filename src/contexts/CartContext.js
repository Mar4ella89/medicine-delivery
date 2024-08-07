import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(window.localStorage.getItem('medicines')) ?? []
  );

  useEffect(() => {
    window.localStorage.setItem('medicines', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (medicines, medicineId) => {
    const existingItem = cartItems.find(({ _id }) => _id === medicineId);

    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item._id === existingItem._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.totalPrice + item.price,
              }
            : item
        )
      );
      return;
    }

    const newMedicine = medicines.find(({ _id }) => _id === medicineId);
    setCartItems(prevState => [
      ...prevState,
      { ...newMedicine, quantity: 1, totalPrice: newMedicine.price },
    ]);
  };

  const removeFromCart = medicineId => {
    setCartItems(cartItems.filter(({ _id }) => medicineId !== _id));
  };

  const updateQuantity = (medicineId, newQuantity) => {
    setCartItems(
      cartItems.map(item => {
        return item._id === medicineId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.price * newQuantity,
            }
          : item;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
