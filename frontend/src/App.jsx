import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser, getUserSpots } from './store/session';
import { getAllSpots } from './store/spots';
import { useSession } from './context/sessionContext';
import Navigation from './components/Navigation/Navigation';
import HomePage from './components/HomePage';
import SpotDetailsPage from './components/SpotDetailsPage/SpotDetailsPage';
import SpotForm from './components/SpotForm/SpotForm';
import ManageSpots from './components/ManageSpots/ManageSpots';
import Footer from './components/Footer'

function Layout() {
  const { session, setSession, setHasSpots } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser()).then(() => setSession(true));
    dispatch(getAllSpots())
    dispatch(getUserSpots())

    return setSession(false)
  }, [dispatch, setSession])

  const spots = useSelector(state => state.session.spots)
  const spotsArr = Object.values(spots);

  useEffect(() => {
    if (spotsArr.length > 0) setHasSpots(true)
  }, [spotsArr.length, setHasSpots])

  return (
    <div className='page-wrapper'>
        <Navigation />
      <main>
        { session && <Outlet /> }
        { session && <Footer /> }
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
