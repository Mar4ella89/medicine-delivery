import React, { createContext, useState, useEffect, useCallback } from 'react';

import { allMedicines } from 'services/medicinesAPI';

const CartContext = createContext({
  filter: null,
  changeFilter: () => {},
  getVisibleMedicines: () => {},
  visibleMedicines: [],
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isLoading: false,
});

export const CartProvider = ({ children }) => {
  const [medicineItems, setMedicineItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllMedicines = async () => {
      try {
        setIsLoading(true);
        const data = await allMedicines();
        setMedicineItems(data);
        setIsLoading(false);
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

  const [favorites, setFavorites] = useState(
    () => JSON.parse(window.localStorage.getItem('favorites')) ?? []
  );

  useEffect(() => {
    window.localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = medicineId => {
    if (!favorites.includes(medicineId)) {
      setFavorites(prevState => [...prevState, medicineId]);
    }
  };

  const removeFromFavorites = medicineId => {
    setFavorites(favorites.filter(id => id !== medicineId));
  };

  const [filter, setFilter] = useState('');
  const [visibleMedicines, setVisibleMedicines] = useState([]);

  const changeFilter = event => setFilter(event.currentTarget.value);

  const getVisibleMedicines = useCallback(() => {
    const normalizedFilter = filter.toLowerCase();

    if (normalizedFilter === '') {
      setVisibleMedicines(medicineItems);
      return;
    }

    setVisibleMedicines(
      medicineItems.filter(({ name }) => {
        return name.toLowerCase().includes(normalizedFilter);
      })
    );
  }, [filter, medicineItems]);

  useEffect(() => {
    setVisibleMedicines(medicineItems);
  }, [medicineItems]);

  return (
    <CartContext.Provider
      value={{
        filter,
        changeFilter,
        getVisibleMedicines,
        visibleMedicines,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
