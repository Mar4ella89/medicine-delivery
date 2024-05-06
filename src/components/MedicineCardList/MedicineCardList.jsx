import { useContext, useState } from 'react';

import CartContext from 'contexts/CartContext';

import css from './MedicineCardList.module.css';

const MedicineCardList = ({ medicines }) => {
  const { addToCart } = useContext(CartContext);
  // const [isActiveBtn, setIsActiveBtn] = useState(true);

  const handleMedicineClick = (medicines, idMedicines) => {
    addToCart(medicines, idMedicines);
    // setIsActiveBtn(false);
    // isChecked;
  };

  const elements = medicines.map(({ _id, name, imgUrl, price, isChecked }) => (
    <li key={_id} className={css.itemMedicine}>
      <img src={imgUrl} alt={name} width={290} className={css.img} />
      <h3 className={css.subtitle}>{name}</h3>
      <div className={css.medicineOrder}>
        <p>{price} $</p>
        <button
          // disabled={true}
          type="button"
          className={css.btnOrder}
          onClick={() => handleMedicineClick(medicines, _id)}
        >
          add to Cart
        </button>
        {/* {!isChecked ? (
          <button
            // disabled="disabled"
            type="button"
            className={css.btnOrder}
            onClick={() => handleMedicineClick(medicines, _id)}
          >
            add to Cart
          </button>
        ) : (
          <button
            // disabled="disabled"
            type="button"
            className={css.btnOrderDisabled}
            onClick={() => handleMedicineClick(medicines, _id)}
          >
            added to Cart
          </button>
        )} */}
      </div>
    </li>
  ));

  return (
    <section className={css.sectionMedicine}>
      <ul className={css.listMedicine}>{elements}</ul>
    </section>
  );
};

export default MedicineCardList;
