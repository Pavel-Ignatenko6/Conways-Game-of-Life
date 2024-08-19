import { useSelector, useDispatch } from 'react-redux'
import { setInputNum, inputNumValue } from '../state/inputNumSlice.js'

import styles from './Slider.module.css'
export const Slider = ({ icon, name }) => {
  const dispatch = useDispatch()
  const sliderVal = useSelector(inputNumValue)
  
  return (
    <div className={styles['slider-container']}>
      <img className={styles['slider-icon']} src={icon} alt="icon" />
      <div className={styles.slider}>
        <input
          className={styles['slider-input']}
          type="range"
          min="0"
          max="100"
          onInput={e => dispatch(setInputNum({[name]: e.target.value}))}
        />
      </div>
      <div className={styles['slider-value']}>{sliderVal[name]}</div>
    </div>
  )
}
