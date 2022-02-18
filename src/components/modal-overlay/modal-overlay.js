import React from 'react';
import styles from './modal-overlay.module.css';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '../../services/actions/index';

function ModalOverlay() {
  const dispatch = useDispatch();

  function closePopup(e) {
    if (e.target === e.currentTarget) {
      dispatch({ type: CLOSE_MODAL });
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={closePopup}></div>
  );
};

export default ModalOverlay;
