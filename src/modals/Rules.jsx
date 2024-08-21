import styles from './Rules.module.css'

const rulesList = {
  1: 'For a space that is populated:',
  2: 'Each cell with one or no neighbors dies, as if by solitude.',
  3: 'Each cell with four or more neighbors dies, as if by overpopulation.',
  4: 'Each cell with two or three neighbors survives.',
  5: 'For a space that is empty or unpopulated:',
  6: 'Each cell with three neighbors becomes populated.',
}

export const Rules = () => {
  return (
    <div>
      <span className="modal-heading">Conway's Game of Life</span>
      <p className={styles.paragraph}>
        'The Game of Life is not your typical computer game. It is a cellular automaton, and was invented by Cambridge mathematician John
        Conway.'
      </p>
      <p className={styles.paragraph}>
        This game became widely known when it was mentioned in an article published by Scientific American in 1970. It consists of a grid of
        cells which, based on a few mathematical rules, can live, die or multiply. Depending on the initial conditions, the cells form
        various patterns throughout the course of the game.
      </p>
      {/* rules */}
      <dl className={styles['rules-list']}>
        <span className={styles.subheading}>Rules :</span>
        {Object.values(rulesList).map(rule => {
          return <dt className={styles['single-rule']} key={rule}>{rule}</dt>
        })}
      </dl>
    </div>
  )
}
