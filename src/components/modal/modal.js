import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropTypes } from '../../utils/types';

const modalRoot = document.getElementById('react-modals');

class Modal extends React.Component {
  handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this.props.closePopup();
    }
  }
  closePopup = () => {
    this.props.closePopup();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscClose);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscClose);
  }

  render() {
    return ReactDOM.createPortal(
      (<ModalOverlay closePopup={this.closePopup}>
        <div className={styles.modal}>
          <button className={styles.exit} onClick={this.closePopup}>
            <CloseIcon type="primary" />
          </button>
          {this.props.children}
        </div>
      </ModalOverlay>), modalRoot
    );
  }
};

Modal.propTypes = {
  closePopup: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;
