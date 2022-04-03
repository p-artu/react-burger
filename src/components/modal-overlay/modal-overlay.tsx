import React, {FC} from 'react';
import styles from './modal-overlay.module.css';
import { IModal } from '../../utils/types';

const ModalOverlay: FC<IModal> = ({closePopup}) => {
  return (
    <div className={styles.modalOverlay} onClick={closePopup}></div>
  );
};

export default ModalOverlay;
