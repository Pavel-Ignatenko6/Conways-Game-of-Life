import styles from './Settings.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { setNumRowsCols, numRowsColsValue } from '../state/numRowsColsSlice';

const iconTypes = ['canvas', 'text', 'svg'];
const cellsAxes = [
  ['X-axis', 'cols'],
  ['Y-axis', 'rows'],
];

export const Settings = () => {
  const dispatch = useDispatch();
  const numColsRowsVal = useSelector(numRowsColsValue);
  
  return (
    <div>
      <span className='modal-heading'>Settings</span>
      {/* icon type */}
      <div className={styles['settings-lists']}>
        <span className={styles.subheading}>Icon Type :</span>
        <dl className={styles['single-list']}>
          {iconTypes.map(iconType => (
            <dt
              className={styles['single-option']}
              key={iconType}
            >
              <input
                type='radio'
                name='icon-type'
                id={iconType}
                defaultChecked
              />
              <label htmlFor={iconType}>{iconType}</label>
            </dt>
          ))}
        </dl>
        {/* cells number */}
        <span className={styles.subheading}>Number of cells :</span>
        <dl className={`${styles['single-list']} ${styles['cells-list']}`}>
          {cellsAxes.map(axis => (
            <dt
              className={styles['cells-number-wrapper']}
              key={axis[1]}
            >
              <label htmlFor={axis[0]}>{axis[0]}</label>
              <input
                className={styles['cells-number-input']}
                type='number'
                name={axis[1]}
                id={axis[1]}
                value={numColsRowsVal[axis[1]]}
                onInput={e => dispatch(setNumRowsCols({ [axis[1]]: e.target.value }))}
              />
            </dt>
          ))}
        </dl>
      </div>
    </div>
  );
};
