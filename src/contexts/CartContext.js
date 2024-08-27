import React, { createContext, useState, useEffect } from 'react';

import { allMedicines } from 'services/medicinesAPI';

const CartContext = createContext({
  filter: null,
  changeFilter: () => {},
  getVisibleMedicines: () => {},
  visibleMedicines: [],
  medicineItems: [],
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [medicineItems, setMedicineItems] = useState([]);

  useEffect(() => {
    const fetchAllMedicines = async () => {
      try {
        const data = await allMedicines();
        setMedicineItems(data);
      } catch ({ response }) {
        console.log(response.data.message);
      }
    };
    fetchAllMedicines();
  }, []);

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

  console.log(medicineItems);

  const [filter, setFilter] = useState('');
  const [visibleMedicines, setVisibleMedicines] = useState(medicineItems);

  console.log(visibleMedicines);

  const changeFilter = event => setFilter(event.currentTarget.value);

  const getVisibleMedicines = () => {
    const normalizedFilter = filter.toLowerCase();

    // return medicineItems.filter(({ name }) => {
    //   return name.toLowerCase().includes(normalizedFilter);
    // });
    if (normalizedFilter === '') {
      setVisibleMedicines(medicineItems);
      return;
    }

    setVisibleMedicines(
      medicineItems.filter(({ name }) => {
        return name.toLowerCase().includes(normalizedFilter);
      })
    );
  };

  useEffect(() => {
    // Фильтрация при изменении medicineItems
    getVisibleMedicines();
  }, [medicineItems]);

  return (
    <CartContext.Provider
      value={{
        filter,
        changeFilter,
        getVisibleMedicines,
        visibleMedicines,
        medicineItems,
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
