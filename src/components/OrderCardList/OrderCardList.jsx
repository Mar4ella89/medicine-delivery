import { useContext } from 'react';

import CartContext from 'contexts/CartContext';

import css from './OrderCardList.module.css';

const OrderCardList = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleRemoveClick = medicineId => {
    removeFromCart(medicineId);
  };

  const handleQuantityChange = (medicineId, event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0) {
      updateQuantity(medicineId, newQuantity);
    }
  };

  const handleQuantityIncrease = (medicineId, quantity) => {
    updateQuantity(medicineId, quantity + 1);
  };

  const handleQuantityDecrease = (medicineId, quantity) => {
    if (quantity > 1) {
      updateQuantity(medicineId, quantity - 1);
    }
  };

  const elements = cartItems.map(
    ({ _id, name, imgUrl, quantity, price, totalPrice }) => (
      <li key={_id + '1'} className={css.itemMedicine}>
        <div className={css.wrapper}>
          <img src={imgUrl} alt={name} width={145} className={css.img} />

          <div className={css.discription}>
            <div>
              <h3 className={css.subtitle}>{name}</h3>
              <p className={css.price}>{price} $</p>
            </div>
            <div className={css.medicineOrder}>
              <div className={css.quantityWrapper}>
                <button
                  className={css.button}
                  onClick={() => handleQuantityDecrease(_id, quantity)}
                >
                  -
                </button>
                <input
                  className={css.input}
                  type="number"
                  value={quantity}
                  onChange={event => handleQuantityChange(_id, event)}
                  min="1"
                  max="10"
                  required
                />
                <button
                  className={css.button}
                  onClick={() => handleQuantityIncrease(_id, quantity)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className={css.action}>
            <button
              type="button"
              className={css.btnOrder}
              onClick={() => handleRemoveClick(_id)}
            >
              Remove
            </button>
            <p>{totalPrice.toFixed(2)} $</p>
          </div>
        </div>
      </li>
    )
  );

  const priceTotal = cartItems.reduce((sum, item) => {
    return sum + item.totalPrice;
  }, 0);

  const quantityTotal = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return (
    <section className={css.sectionMedicine}>
      <ul className={css.listMedicine}>{elements}</ul>
      {cartItems.length ? (
        <div className={css.totalInfo}>
          <p>
            Selected medicines:
            <span className={css.sum}> {quantityTotal} </span> pcs
          </p>
          <p className={css.totalPrice}>
            Total price:
            <span className={css.sum}> {priceTotal.toFixed(2)} </span> $
          </p>
        </div>
      ) : (
        <p className={css.order}>You don't have any item in your cart yet...</p>
      )}
    </section>
  );
};

export default OrderCardList;
