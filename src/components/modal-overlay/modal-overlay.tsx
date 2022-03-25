import React, {FC} from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlay {
  closePopup: () => void;
}
const ModalOverlay: FC<IModalOverlay> = ({closePopup}) => {
  return (
    <div className={styles.modalOverlay} onClick={closePopup}></div>
  );
};

export default ModalOverlay;
