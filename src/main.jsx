import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Callback from './Components/Callback.jsx'
import Home from './Components/Home.jsx'

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
    ],
},
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <RouterProvider router = {router}/>
    </Provider>
    
  </StrictMode>,
)