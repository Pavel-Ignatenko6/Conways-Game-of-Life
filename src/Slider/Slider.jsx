import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setInputNum } from '../state/inputNumSlice.js'

import styles from './Slider.module.css'
export const Slider = ({ icon, name }) => {
  const [percent, setPercent] = useState(50)

  const dispatch = useDispatch()
  const num = 500

  return (
    <div className={styles['slider-container']}>
      <img className={styles['slider-icon']} src={icon} alt="icon" />
      <div className={styles.slider}>
        <input
          className={styles['slider-input']}
          type="range"
          min="1"
          max="100"
          onInput={e => {
            setPercent(e.target.value)
            dispatch(setInputNum({ [name]: num - (num / 100) * percent }))
          }}
        />
      </div>
      <div className={styles['slider-value']}>{percent}</div>
    </div>
  )
}
