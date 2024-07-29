import styles from './RulesModal.module.css'
import { useNavigate } from 'react-router-dom'
import closeIcon from '../assets/xmark-solid.svg'

export const RulesModal = () => {
  const navigate = useNavigate()
  return (
    <div className={styles['modal-container']} onClick={(e) => {
      if (e.target === e.currentTarget) {
        navigate('/')
      }
    }}>
      <div className={styles.modal}>
        <div className={styles['close-btn-container']}>
          <button className={styles['close-btn']} onClick={() => navigate('/')}>
            <img className={styles['close-icon']} src={closeIcon} alt="close icon" />
          </button>
        </div>
        <span className={styles.heading}>Conway's Game of Life</span>
        <p className={styles.paragraph}>
          The Game of Life is not your typical computer game. It is a cellular automaton, and was invented by Cambridge mathematician John
          Conway.
        </p>
        <p className={styles.paragraph}>
          This game became widely known when it was mentioned in an article published by Scientific American in 1970. It consists of a grid
          of cells which, based on a few mathematical rules, can live, die or multiply. Depending on the initial conditions, the cells form
          various patterns throughout the course of the game.
        </p>
        {/* rules */}
        <dl className={styles['rules-list']}>
          <span className={styles.subheading}>Rules :</span>
          <dt className={styles['single-rule']}>For a space that is populated:</dt>
          <dt className={styles['single-rule']}>Each cell with one or no neighbors dies, as if by solitude.</dt>
          <dt className={styles['single-rule']}>Each cell with four or more neighbors dies, as if by overpopulation.</dt>
          <dt className={styles['single-rule']}>Each cell with two or three neighbors survives.</dt>
          <br />
          <dt className={styles['single-rule']}>For a space that is empty or unpopulated:</dt>
          <dt className={styles['single-rule']}>Each cell with three neighbors becomes populated.</dt>
        </dl>
      </div>
      <dl></dl>
    </div>
  )
}
