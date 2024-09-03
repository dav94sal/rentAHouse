import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { restoreUser } from './store/session';
import SignupForm from './components/SignupFormPage';
import Navigation from './components/Navigation/Navigation';

function Layout() {
  const [session, setSession] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser()).then(() => setSession(true))
  }, [dispatch])

  return (
    <div className='page-wrapper'>
      <main>
        <Navigation />
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
        path: '/signup',
        element: <SignupForm />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
