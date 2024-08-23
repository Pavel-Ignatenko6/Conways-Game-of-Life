import styles from './Records.module.css'
import { useEffect, useState } from 'react'
import { getFromLocalStorage } from '../helpers/handleLocalStorage.js'
export const Records = () => {
  const recordNum = ['1.', '2.', '3.']

  const [records, setRecords] = useState([])
  const storageRecords = getFromLocalStorage('records')

  useEffect(() => {
    const getStorageRecords = () => {
      if (storageRecords) {
        setRecords(storageRecords)
      } else {
        setRecords(null)
      }
    }
    getStorageRecords()

    window.addEventListener('storage', getStorageRecords)

    return () => {
      window.removeEventListener('storage', getStorageRecords)
    }
  }, [])

  const getBestScore = () => {
    if (!records) {
      return
    }
    const best = Math.max(...records)
    return best
  }

  const getLastThreeRecords = () => {
    if (!records) {
      return
    }
    return records.slice(-3).reverse()
  }

  return (
    <div className={styles.container}>
      <span className="modal-heading">Records</span>
      <span className={styles.best}>Your best : {getBestScore()} </span>
      <div className={styles['records-list-container']}>
        <span className={styles.recordsText}>Last 3 tries :</span>
        <ul className={styles['records-list']}>
          {getLastThreeRecords().map((record, index) => {
            return (
              <li className={styles['single-record']} key={index}>
                <span className={styles['record-num']}>{'-'}</span>
                <span className={styles['record-val']}>{record}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
