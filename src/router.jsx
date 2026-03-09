import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './ui/MainLayout'
import { HomePage } from './views/HomePage'
import { OpportunitiesPage } from './views/OpportunitiesPage'
import { AboutPage } from './views/AboutPage'
import { NotFoundPage } from './views/NotFoundPage'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'opportunities', element: <OpportunitiesPage /> },
        { path: 'about', element: <AboutPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)