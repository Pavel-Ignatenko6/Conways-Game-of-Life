import styles from './ModalElement.module.css'

import closeIcon from '../assets/xmark-solid.svg'
import { useNavigate } from 'react-router-dom'

export const ModalElement = ({ children }) => {
  const navigate = useNavigate()

  return (
    <div className={styles['modal-background']} onClick={() => navigate('/')}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles['close-btn-container']}>
          <button className={styles['close-btn']} onClick={() => navigate('/')}>
            <img className={styles['close-icon']} src={closeIcon} alt="close icon" />
          </button>
        </div>
        <div className="children-container">{children}</div>
      </div>
    </div>
  )
}
