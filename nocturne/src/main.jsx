import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from './redux/store.js'
import './index.css'
import App from './App.jsx'
import Callback from './Components/Callback.jsx'
import Home from './Components/Home.jsx'
import Discover from './Components/Discover.jsx'
import Artist from './Components/Artist.jsx'
import Signup from './Components/Signup.jsx'
import Login from './Components/Login.jsx'
import Favorites from './Components/Favorites.jsx'
import Vibe from './Components/Vibe.jsx'
import Genres from './Components/Genres.jsx'

import ProtectedRoute from './Components/ProtectedRoute.jsx'


const router = createBrowserRouter([
    {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/callback",
            element: <Callback />,
        },
        {
          path: "/discover",
          element: <Discover/>
        },
        {
          path: "/artist/:id",
          element: <Artist/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/sign-up",
          element: <Signup/>
        },
        {
          path: "/vibe",
          element: <Vibe/>
        },
        {  
          element: <ProtectedRoute/>,
          children :[{
            path: "/favorites",
            element: <Favorites/>},
          ],
        },
        {
          path: "/genres",
          element: <Genres/>
        },
    ],
},
])


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);