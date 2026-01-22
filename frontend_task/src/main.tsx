import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import About from './components/About.tsx'
import NotFound from './components/NotFound.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductDetail from './components/ProductDetail.tsx'
import Layout from './Layout.tsx'
// import ProductCard from './components/ProductCard.tsx'
import CartPage from './components/CartPage.tsx'
import Home from './Home.tsx'
import ProductPage from './components/ProductPage.tsx'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

  const queryClient = new QueryClient();
  

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
      {
        path: "/", 
        element: <Home />, 
        children: [
          { path: "product", element: <ProductPage /> }, 
          { path: "product/:id", element: <ProductDetail /> }, 
          { path: "cart", element: <CartPage /> }, 
        ],
      },
      { path: "about", element: <About /> }, 
      { path: "*", element: <NotFound /> }, 
    ],
    },
    
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client= {queryClient}>
      <RouterProvider router={router} />

    </QueryClientProvider>
  </StrictMode>,
)
