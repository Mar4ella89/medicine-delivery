import { useContext } from 'react';

import CartContext from 'contexts/CartContext';

import css from './OrderCardList.module.css';

const OrderCardList = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const handleRemoveClick = medicineId => {
    removeFromCart(medicineId);
  };

  const elements = cartItems.map(({ _id, name, imgUrl, price }) => (
    <li key={_id + '1'} className={css.itemMedicine}>
      <img src={imgUrl} alt={name} width={290} className={css.img} />
      <h3 className={css.subtitle}>{name}</h3>
      <div className={css.medicineOrder}>
        <p>{price} $</p>
        <button className={css.btnOrder} onClick={() => handleRemoveClick(_id)}>
          Remove
        </button>
      </div>
    </li>
  ));

  return (
    <section className={css.sectionMedicine}>
      <ul className={css.listMedicine}>{elements}</ul>
    </section>
  );
};

export default OrderCardList;
