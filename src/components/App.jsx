import { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchImages from 'js/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const MESSAGES = {
  success: totalHits => `Hooray! We found ${totalHits} images.`,
  error: 'Oops! Something went wrong! Try reloading the page!',
  noImages:
    'Sorry, there are no images matching your search query. Please try again.',
  endOfResults: "We're sorry, but you've reached the end of search results.",
};

const PER_PAGE = 12;

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;
    loadImagesData(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const loadImagesData = async (query, page) => {
    setIsLoading(true);
    try {
      const searchResults = await fetchImages(query, page, PER_PAGE);

      if (searchResults.total === 0) {
        Notify.failure(MESSAGES.noImages);
      } else {
        if (page === 1) {
          Notify.success(MESSAGES.success(searchResults.totalHits));
        }

        const canLoadMorePages =
          page < Math.ceil(searchResults.totalHits / PER_PAGE);

        if (!canLoadMorePages && page > 1) {
          Notify.info(MESSAGES.endOfResults);
        }

        setImages(prevImages => [...prevImages, ...searchResults.hits]);
        setLoadMore(canLoadMorePages);
      }
    } catch (error) {
      Notify.failure(MESSAGES.error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSearchHandler = newSearchQuery => {
    if (newSearchQuery === searchQuery && currentPage === 1) {
      setImages([]);
      loadImagesData(searchQuery, currentPage);
    } else {
      setSearchQuery(newSearchQuery);
      setImages([]);
      setCurrentPage(1);
    }
  };

  const loadMoreHandler = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const openModal = imageData => {
    setIsOpenModal(true);
    setModalData(imageData);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalData(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSearchHandler} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {loadMore && !isLoading && (
        <Button name="Load more" onClickHandler={loadMoreHandler} />
      )}
      {isLoading && <Loader />}
      {isOpenModal && <Modal closeModal={closeModal} modalData={modalData} />}
    </div>
  );
};

export default App;
