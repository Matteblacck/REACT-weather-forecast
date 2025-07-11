import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//pages
import MainPage from '../02-pages/MainPage.tsx';
// routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Родительский компонент (App)
    children: [
      {
        index: true,  // Главная страница для гостей
        element: <MainPage />,
      },
    //   {
    //     element: <ProtectedRoute />,  // Защищенные маршруты
    //     children: [
    //       { path: '/dashboard', element: <DashboardPage /> }, // Страница для авторизованных пользователей
    //       { path: '/profile', element: <ProfilePage />},
    //       { path: '/boards', element: <BoardsPage />},
    //       { path: '/boards/board/:id', element: <BoardPage/>},
    //       { path: '/settings', element: <SettingsPage/>}
    //     ],
    //   },
    ],
  },
], {basename: import.meta.env.BASE_URL }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
