import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

class ModalOverlay extends React.Component {
  closePopup = (e) => {
    if (e.target === e.currentTarget) {
      this.props.closePopup();
    }
  }

  render() {
    return (
      <div className={styles.modalOverlay} onClick={this.closePopup}></div>
    );
  }
};

ModalOverlay.propTypes = {
  closePopup: PropTypes.func.isRequired
};

export default ModalOverlay;
