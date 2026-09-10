import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Callback from './Components/Callback.jsx'
import Home from './Components/Home.jsx'
import Discover from './Components/Discover.jsx'
import Artist from './Components/Artist.jsx'
import Signup from './Components/Signup.jsx'
import Login from './Components/Login.jsx'
import Favourites from './Components/Favourites.jsx'
import Vibe from './Components/Vibe.jsx'

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
          path: "/favourites",
          element: <Favourites/>
        },
    ],
},
])


createRoot(document.getElementById('root')).render(

   
      <RouterProvider router = {router}/>
    
 
)