import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Callback from './Components/Callback.jsx'
import Home from './Components/Home.jsx'
import Discover from './Components/Discover.jsx'
import Artist from './Components/Artist.jsx'

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
    ],
},
])


createRoot(document.getElementById('root')).render(

   
      <RouterProvider router = {router}/>
    
 
)