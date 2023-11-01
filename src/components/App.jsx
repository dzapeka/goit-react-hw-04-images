import { useEffect, useRef, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchImages from 'js/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const successMessage = totalHits => `Hooray! We found ${totalHits} images.`;
const errorMessage = 'Oops! Something went wrong! Try reloading the page!';
const noImagesMessage =
  'Sorry, there are no images matching your search query. Please try again.';
const endOfResultsMessage =
  "We're sorry, but you've reached the end of search results.";

const perPage = 12;

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

    setIsLoading(true);

    fetchImages(searchQuery, currentPage, perPage)
      .then(searchResults => {
        if (searchResults.total === 0) {
          Notify.failure(noImagesMessage);
        } else {
          if (currentPage === 1) {
            Notify.success(successMessage(searchResults.totalHits));
          }

          const canLoadMore =
            currentPage < Math.ceil(searchResults.totalHits / perPage);

          if (!canLoadMore) {
            Notify.info(endOfResultsMessage);
          }

          setImages(prevImages => [...prevImages, ...searchResults.hits]);

          setLoadMore(canLoadMore);
        }
      })
      .catch(error => {
        Notify.failure(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, currentPage]);

  // componentDidUpdate(prevProps, prevState) {
  //   const { searchQuery, currentPage, images } = this.state;
  //   const searchQueryChanged = prevState.searchQuery !== searchQuery;
  //   const currentPageChanged = prevState.currentPage !== currentPage;
  //   // Checking if it is a new search with the same searchQuery
  //   const imagesClearedAndNewSearch =
  //     prevState.images !== images && images.length === 0;

  //   if (searchQueryChanged || currentPageChanged || imagesClearedAndNewSearch) {
  //     this.setState({ isLoading: true });
  //     fetchImages(searchQuery, currentPage, perPage)
  //       .then(searchResults => {
  //         if (searchResults.total === 0) {
  //           Notify.failure(noImagesMessage);
  //         } else {
  //           if (currentPage === 1) {
  //             Notify.success(successMessage(searchResults.totalHits));
  //           }

  //           const loadMore =
  //             currentPage < Math.ceil(searchResults.totalHits / perPage);

  //           if (!loadMore) {
  //             Notify.info(endOfResultsMessage);
  //           }

  //           this.setState(prevState => ({
  //             images: [...prevState.images, ...searchResults.hits],
  //             loadMore,
  //           }));
  //         }
  //       })
  //       .catch(error => {
  //         Notify.failure(errorMessage);
  //       })
  //       .finally(() => {
  //         this.setState({ isLoading: false });
  //       });
  //   }
  // }

  const onSearchHandler = newSearchQuery => {
    setSearchQuery(newSearchQuery);
    setImages([]);
    setCurrentPage(1);
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
