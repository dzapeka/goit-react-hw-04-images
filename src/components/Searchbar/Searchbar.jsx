import { useState } from 'react';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);
  };

  const handleChange = event => setSearchQuery(event.target.value);

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          name="searchQuery"
          value={searchQuery}
          onChange={handleChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
