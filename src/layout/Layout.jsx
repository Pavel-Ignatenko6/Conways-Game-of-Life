import { Outlet } from 'react-router-dom'

import styles from './Layout.module.css'

export function Layout() {
  return (
    <div className={styles['layout-container']}>
      {/* header */}
      <div className={styles.header}>
        <h1>Conway's Game of Life</h1>
      </div>
      {/* Outlet renders children routes */}
      <div className='page-content'>
        <Outlet />
      </div>
      {/* footer */}
      <div className={styles.footer}>
        <span className={styles['footer-text']}>
          Developed by{' '}
          <a href="https://github.com/Pavel-Ignatenko6" className={styles['footer-link']}>
            Pavel Ignatenko
          </a>
        </span>
      </div>
    </div>
  )
}
