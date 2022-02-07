import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');

function Modal(props) {
  function handleEscClose(e) {
    if (e.key === 'Escape') {
      props.closePopup();
    }
  }
  function closePopup() {
    props.closePopup();
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);

  return ReactDOM.createPortal(
    (<div className={styles.container}>
      <div className={styles.modal}>
        <button className={styles.exit} onClick={closePopup}>
          <CloseIcon type="primary" />
        </button>
        {props.title === 'Детали ингредиента' ?
          (<h2 className={`text text_type_main-large mt-10 ml-10 ${styles.title}`}>{props.title}</h2>)
          :
          (<h2 className={`text text_type_digits-large mt-30 mb-8 ${styles.id}`}>{props.title}</h2>)
        }
        {props.children}
      </div>
      <ModalOverlay closePopup={closePopup}/>
    </div>), modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  closePopup: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;
