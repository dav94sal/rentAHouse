import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { restoreUser } from './store/session';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';

function Layout() {
  const [session, setSession] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser()).then(() => setSession(true))
  }, [dispatch])

  return (
    <div className='page-wrapper'>
      <main>
        {session? <Outlet /> : ''}
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome</h1>
      },
      {
        path: '/login',
        element: <LoginFormPage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
