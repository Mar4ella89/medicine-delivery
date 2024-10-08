import { useContext } from 'react';
import { toast } from 'react-toastify';

import CartContext from 'contexts/CartContext';

import css from './MedicineCardList.module.css';

const MedicineCardList = ({ medicines }) => {
  const { addToCart, favorites, addToFavorites, removeFromFavorites } =
    useContext(CartContext);

  const handleMedicineClick = (medicines, idMedicines) => {
    addToCart(medicines, idMedicines);
    toast.success('The medicine has been added to the order cart');
  };

  const handleFavoriteClick = idMedicines => {
    if (favorites.includes(idMedicines)) {
      removeFromFavorites(idMedicines);
      return;
    }
    addToFavorites(idMedicines);
  };

  const elements = medicines.map(({ _id, name, imgUrl, price }) => (
    <li key={_id} className={css.itemMedicine}>
      <img src={imgUrl} alt={name} width={290} className={css.img} />
      <h3 className={css.subtitle}>{name}</h3>
      <div className={css.medicineOrder}>
        <p>{price.toFixed(2)} $</p>
        <button
          type="button"
          className={css.btnFavorite}
          onClick={() => handleFavoriteClick(_id)}
        >
          {favorites.includes(_id) ? '❤️' : '🤍'}
        </button>
        <button
          type="button"
          className={css.btnOrder}
          onClick={() => handleMedicineClick(medicines, _id)}
        >
          add to Cart
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

export default MedicineCardList;
