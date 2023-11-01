import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <>
      {images.length > 0 && (
        <ul className={styles.ImageGallery}>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default ImageGallery;
