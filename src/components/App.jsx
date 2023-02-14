import { Component } from 'react';
import { ColorRing } from 'react-loader-spinner';

import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { searchImageAPI } from '../api/api';

import styles from './App.module.css';

class App extends Component {
  state = {
    search: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.fetchPosts();
    }

    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  async fetchPosts() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;

      const data = await searchImageAPI(search, page);

      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    if (search.trim()) {
      this.setState({ search, images: [], page: 1 });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showImage = data => {
    this.setState({
      largeImageURL: data,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  render() {
    const { images, loading, error, showModal, largeImageURL } = this.state;
    const { searchImages, loadMore, showImage, closeModal } = this;

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
  }
}
export default App;
