import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { restoreUser } from './store/session';
import Navigation from './components/Navigation/Navigation';
import HomePage from './components/HomePage';
import SpotDetailsPage from './components/SpotDetailsPage/SpotDetailsPage';

function Layout() {
  const [session, setSession] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser()).then(() => setSession(true));
  }, [dispatch])

  return (
    <div className='page-wrapper'>
        <Navigation />
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
        element: <HomePage />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetailsPage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
