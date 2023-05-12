import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Post } from '../pages/Post'
import { Main } from '../templates/Main'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/post/:id',
        element: <Post />,
      },
    ],
  },
])
