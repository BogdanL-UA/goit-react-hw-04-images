import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ preview, fullSize, showImage }) => {
  return (
    <li
      className={styles.imageGalleryItem}
      onClick={() => {
        showImage(fullSize);
      }}
    >
      <img src={preview} className={styles.imageGalleryItem_image} alt="" />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  preview: PropTypes.string.isRequired,
  fullSize: PropTypes.string.isRequired,
  showImage: PropTypes.func.isRequired,
};
