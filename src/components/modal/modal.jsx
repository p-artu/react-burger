import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');

function Modal({closePopup, ...props}) {
  React.useEffect(() => {
    function handleEscClose(e) {if (e.key === 'Escape') closePopup()};
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);
  console.log('location?.state?.from');
  return ReactDOM.createPortal(
    (<div className={styles.container}>
      <div className={styles.modal}>
        <button className={styles.exit} onClick={closePopup}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
      <ModalOverlay closePopup={closePopup}/>
    </div>), modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closePopup: PropTypes.func.isRequired
};

export default Modal;
