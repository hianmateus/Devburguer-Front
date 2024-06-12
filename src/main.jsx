import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyles from './styles/globalStyles'
import { ToastContainer } from 'react-toastify'
import {router} from './routes'

import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    < RouterProvider router={router}/>
    <GlobalStyles/>
    <ToastContainer autoClose={2000}/>
  </React.StrictMode>,
)
