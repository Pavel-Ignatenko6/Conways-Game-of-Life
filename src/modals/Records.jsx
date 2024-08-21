import styles from './Records.module.css'
export const Records = () => {
  return (
    <div className={styles.container}>
      <span className="modal-heading">Records</span>
      <span className={styles.best}>Your best : {} </span>
      <div className={styles['records-list-container']}>
        <span className={styles.recordsText}>Last 3 tries :</span>
        <ul className={styles['records-list']}>
          <li className={styles['single-record']}>
            <span className={styles['record-num']}>1.</span>
            <span className={styles['record-val']}>{}</span>
          </li>
          <li className={styles['single-record']}>
            <span className={styles['record-num']}>2.</span>
            <span className={styles['record-val']}>{}</span>
          </li>
          <li className={styles['single-record']}>
            <span className={styles['record-num']}>3.</span>
            <span className={styles['record-val']}>{}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
