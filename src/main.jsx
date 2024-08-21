import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// redux imports
import { Provider } from 'react-redux'
import { store } from './state/store'

// router imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './layout/Layout.jsx'
import { NotFoundPage } from './ErrorPage/NotFoundPage.jsx'
import { ModalElement } from './modals/ModalElement.jsx'
import { Rules } from './modals/Rules.jsx'
import { Settings } from './modals/Settings.jsx'
import { Records } from './modals/Records.jsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: '/records',
            element: <ModalElement children={<Records />} />,
          },
          {
            path: '/rules',
            element: <ModalElement children={<Rules />} />,
          },
          {
            path: '/settings',
            element: <ModalElement children={<Settings />} />,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
