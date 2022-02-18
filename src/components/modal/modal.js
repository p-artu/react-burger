import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL } from '../../services/actions/index';

const modalRoot = document.getElementById('react-modals');

function Modal(props) {
  const dispatch = useDispatch();
  const { modalTitle } = useSelector(store => store.reducer);

  function handleEscClose(e) {
    if (e.key === 'Escape') {
      dispatch({ type: CLOSE_MODAL });
    }
  }
  function closePopup() {
    dispatch({ type: CLOSE_MODAL });
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
        {modalTitle === 'Детали ингредиента' ?
          (<h2 className={`text text_type_main-large mt-10 ml-10 ${styles.title}`}>{modalTitle}</h2>)
          :
          (<h2 className={`text text_type_digits-large mt-30 mb-8 ${styles.id}`}>{modalTitle}</h2>)
        }
        {props.children}
      </div>
      <ModalOverlay/>
    </div>), modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired
};

export default Modal;
