import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

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
      (<div className={styles.container}>
        <div className={styles.modal}>
          <button className={styles.exit} onClick={this.closePopup}>
            <CloseIcon type="primary" />
          </button>
          {this.props.title === 'Детали ингредиента' ?
            (<h2 className={`text text_type_main-large mt-10 ml-10 ${styles.title}`}>{this.props.title}</h2>)
            :
            (<h2 className={`text text_type_digits-large mt-30 mb-8 ${styles.id}`}>{this.props.title}</h2>)
          }
          {this.props.children}
        </div>
        <ModalOverlay closePopup={this.closePopup}/>
      </div>), modalRoot
    );
  }
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  closePopup: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;
