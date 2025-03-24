import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import store from './app/store'
import { AppProvider, useGlobalContext } from './context'
import App from './app/App'

import {
  Home,
  Error,
  Register,
  Login,
  Verify,
  ProtectedRoute,
  ForgotPassword,
  ResetPassword,
} from './pages'
import './styles/reset.css'
import './styles/main.css'
import './styles/utils.scss'
import './components/Header/header.scss'
import { Navbar } from './components/Auth'

const AppLayout = () => {
  const { isLoading } = useGlobalContext()
  if (isLoading) {
    return (
      <section className='page page-center'>
        <div className='loading'></div>
      </section>
    )
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'user/verify-email',
        element: <Verify />,
      },
      {
        path: 'user/reset-password',
        element: <ResetPassword />,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
])

const persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AppProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </AppProvider>
)
