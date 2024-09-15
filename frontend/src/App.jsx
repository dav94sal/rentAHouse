import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from './store/session';
import { getAllSpots, getUserSpots, resetUser } from './store/spots';
import Navigation from './components/Navigation/Navigation';
import HomePage from './components/HomePage';
import SpotDetailsPage from './components/SpotDetailsPage/SpotDetailsPage';
import SpotForm from './components/SpotForm/SpotForm';
import ManageSpots from './components/ManageSpots/ManageSpots';

function Layout() {
  const [session, setSession] = useState(false);
  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser()).then(() => setSession(true));
    dispatch(getAllSpots())
  }, [dispatch])

  useEffect(() => {
    if (user) dispatch(getUserSpots())

    dispatch(resetUser())
  }, [user])

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
        path: '/spots',
        children: [
          {
            path: ':spotId',
            element: <SpotDetailsPage />
          },
          {
            path: ':spotId/edit',
            element: <SpotForm isNewSpot={false} />
          },
          {
            path: 'new',
            element: <SpotForm isNewSpot={true} />
          },
          {
            path: 'current',
            element: <ManageSpots />
          }
        ]
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
