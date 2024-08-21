import styles from './Settings.module.css'

const iconTypes = ['canvas', 'text', 'svg']
const cellsAxes = ['Y-axis', 'X-axis']

export const Settings = () => {
  return (
    <div>
      <span className="modal-heading">Settings</span>
      {/* icon type */}
      <div className={styles['settings-lists']}>
        <dl className={styles['single-list']}>
          <span className={styles.subheading}>Icon Type :</span>
          {iconTypes.map(iconType => (
            <dt className={styles['single-option']} key={iconType}>
              <input type="radio" name="icon-type" id={iconType} defaultChecked />
              <label htmlFor={iconType}>{iconType}</label>
            </dt>
          ))}
        </dl>
        {/* cells number */}
        <dl className={styles['single-list']}>
          <span className={styles.subheading}>Number of cells :</span>
          {cellsAxes.map(axis => (
            <dt className={styles['cells-number-wrapper']} key={axis}>
              <label htmlFor={axis}>{axis}</label>
              <input type="number" name={axis} id={axis} />
            </dt>
          ))}
        </dl>
      </div>
    </div>
  )
}
