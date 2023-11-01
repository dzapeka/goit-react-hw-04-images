import { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ closeModal, modalData: { largeImageURL, tags } }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  });

  const handleOverayClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.Overlay} onClick={handleOverayClick}>
      <div className={styles.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

export default Modal;
