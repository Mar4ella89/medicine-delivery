import { ImSearch } from 'react-icons/im';

import { toast } from 'react-toastify';

import { useState } from 'react';
import PropTypes from 'prop-types';

import css from './MedicineSearchForm.module.css';

// const MedicineSearchForm = ({ onSubmit }) => {
const MedicineSearchForm = ({ value, onChange }) => {
  // const [searchQuery, setSearchQuery] = useState('');

  // const handleNameChange = event => {
  //   setSearchQuery(event.currentTarget.value.toLowerCase());
  // };

  const reset = () => {
    value = '';
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (value.trim() === '') {
      return toast.warn('Please enter a search term in the search box');
    }

    // onSubmit(searchQuery);
    reset();
  };

  return (
    <div className={css.SearcWrapper}>
      <header className={css.Searchbar}>
        {/* <form className={css.SearchForm}> */}
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          {/* <form className={css.SearchForm} onSubmit={onSubmit}> */}
          <button type="submit" className={css.SearchFormButton}>
            <ImSearch
              style={{
                marginTop: 4,
              }}
            />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            name="searchQuery"
            value={value}
            onChange={onChange}
            autoComplete="off"
            autoFocus
            placeholder="Search medicines"
          />
        </form>
      </header>
    </div>
  );
};

// MedicineSearchForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default MedicineSearchForm;
