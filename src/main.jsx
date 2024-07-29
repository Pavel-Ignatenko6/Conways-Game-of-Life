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
import { RulesModal } from './modals/RulesModal.jsx'
import { SettingsModal } from './modals/SettingsModal.jsx'

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
            path: '/rules',
            element: <RulesModal />,
          },
          {
            path: '/settings',
            element: <SettingsModal />,
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
