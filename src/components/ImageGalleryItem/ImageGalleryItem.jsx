import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, openModal }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        className={styles.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        heigth={260}
        loading={'lazy'}
        onClick={() => openModal({ largeImageURL, tags })}
      />
    </li>
  );
};

export default ImageGalleryItem;
