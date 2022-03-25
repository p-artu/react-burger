import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { modalRoot } from '../../utils/constants';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModal {
  closePopup: () => void;
}
const Modal: FC<IModal> = ({closePopup, children}) => {
  React.useEffect(() => {
    function handleEscClose(e: KeyboardEvent) {if (e.key === 'Escape') closePopup()};
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);

  return modalRoot && ReactDOM.createPortal(
    (<div className={styles.container}>
      <div className={styles.modal}>
        <button className={styles.exit} onClick={closePopup}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay closePopup={closePopup}/>
    </div>), modalRoot
  );
};

export default Modal;
