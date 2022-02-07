import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay(props) {
  function closePopup(e) {
    if (e.target === e.currentTarget) {
      props.closePopup();
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={closePopup}></div>
  );
};

ModalOverlay.propTypes = {
  closePopup: PropTypes.func.isRequired
};

export default ModalOverlay;
