import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';
import { ingredientsPropTypes } from '../../utils/types';

class ModalOverlay extends React.Component {
  closePopup = (e) => {
    if (e.target === e.currentTarget) {
      this.props.closePopup();
    }
  }

  render() {
    return (
      <div className={styles.modalOverlay} onClick={this.closePopup}>
        {this.props.children}
      </div>
    );
  }
};

ModalOverlay.propTypes = {
  closePopup: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default ModalOverlay;
