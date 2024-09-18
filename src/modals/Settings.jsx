import styles from './Settings.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setNumRowsCols, numRowsColsValue } from '../state/numRowsColsSlice';
import { setFieldType, fieldTypeValue } from '../state/fieldTypeSlice';
import { setSvgType, svgTypeValue } from '../state/svgTypeSlice';
// svgs
import bearIcon from '../assets/cells/bear-icon.svg';
import catIcon from '../assets/cells/cat-icon.svg';
import duckIcon from '../assets/cells/duck-icon.svg';
import foxIcon from '../assets/cells/fox-icon.svg';

const fieldTypes = ['canvas', 'text', 'svg'];
const cellsAxes = [
  ['X-axis', 'cols'],
  ['Y-axis', 'rows'],
];

const cellSvgs = [
  ['bearIcon', bearIcon],
  ['catIcon', catIcon],
  ['duckIcon', duckIcon],
  ['foxIcon', foxIcon],
];

export const Settings = () => {
  const dispatch = useDispatch();
  const numColsRowsVal = useSelector(numRowsColsValue);
  const fieldTypeVal = useSelector(fieldTypeValue);
  const svgTypeVal = useSelector(svgTypeValue);

  const handleCellsNumberInput = (e, axis) => {
    if (e.target.value === '') {
      return;
    }

    Number(e.target.value) < 1 ? dispatch(setNumRowsCols({ [axis]: 1 })) : dispatch(setNumRowsCols({ [axis]: Number(e.target.value) }));

    Number(e.target.value) > 50 ? dispatch(setNumRowsCols({ [axis]: 50 })) : undefined;
  };

  return (
    <div>
      <span className='modal-heading'>Settings</span>
      {/* field type */}
      <div className={styles['settings-lists']}>
        <span className={styles.subheading}>Field Type :</span>
        <dl className={styles['single-list']}>
          {fieldTypes.map(fieldType => (
            <dt
              className={styles['sigle-noption']}
              key={fieldType}
            >
              <input
                type='radio'
                name='field-type'
                id={fieldType}
                defaultChecked={fieldTypeVal === fieldType ? true : false}
                onInput={() => dispatch(setFieldType(fieldType))}
              />
              <label htmlFor={fieldType}>{fieldType}</label>
            </dt>
          ))}
        </dl>
        {/* svg type */}
        {fieldTypeVal === 'svg' && (
          <div>
            <span className={styles.subheading}>SVG Type :</span>
            <dl className={`${styles['single-list']} ${styles['svg-list']}`}>
              {cellSvgs.map(([name, icon]) => {
                return (
                  <dt
                    key={name}
                    // if name is equal svgTypeVal change svg type state
                    className={`${styles['svg-type']} ${svgTypeVal === name ? styles['svg-type-active'] : ''}`}
                    // change svg type state onclick
                    onClick={() => dispatch(setSvgType(name))}
                  >
                    <img
                      className='single-svg'
                      src={icon}
                      alt={name}
                    />
                  </dt>
                );
              })}
            </dl>
          </div>
        )}
        {/* cells number */}
        <span className={styles.subheading}>Number of cells :</span>
        <dl className={`${styles['single-list']} ${styles['cells-list']}`}>
          {cellsAxes.map(([label, axis]) => (
            <dt
              className={styles['cells-number-wrapper']}
              key={axis}
            >
              <label htmlFor={label}>{label}</label>
              <input
                className={styles['cells-number-input']}
                type='number'
                name={axis}
                id={axis}
                value={numColsRowsVal[axis]}
                onChange={e => handleCellsNumberInput(e, axis)}
              />
            </dt>
          ))}
        </dl>
      </div>
    </div>
  );
};
