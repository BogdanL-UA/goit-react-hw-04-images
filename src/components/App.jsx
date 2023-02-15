import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { searchImageAPI } from '../api/api';

import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

import styles from './App.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (search) {
      const fetchPosts = async () => {
        try {
          setLoading(true);

          const data = await searchImageAPI(search, page);

          setImages(images => [...images, ...data.hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }
  }, [
    search,
    page,
    setLoading,
    searchImageAPI,
    setImages,
    setError,
    setLoading,
  ]);

  const searchImages = ({ search }) => {
    if (search.trim()) {
      setSearch(search);
      setImages([]);
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showImage = data => {
    setLargeImageURL(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={searchImages} />

      <ImageGallery images={images} showImage={showImage} />

      {loading && (
        <ColorRing
          height="100"
          width="100"
          radius="10"
          color="green"
          ariaLabel="loading"
        />
      )}
      {error && <p>Error! Try again later.</p>}

      {Boolean(images.length) && <Button loadMore={loadMore} />}
      {showModal && (
        <Modal close={closeModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default App;
