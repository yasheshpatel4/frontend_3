import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import About from './components/About.tsx'
import NotFound from './components/NotFound.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductDetail from './components/ProductDetail.tsx'
import Layout from './Layout.tsx'
import ProductCard from './components/ProductCard.tsx'
import CartPage from './components/CartPage.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path:"/", element:<App/>, 
              children:[
                { path: "products", element: <ProductCard theme={''} id={0} name={''} price={0} category={''} stock={0} deleteProduct={function (id: number): void {
                  throw new Error('Function not implemented.')
                } } addToCart={function (id: number): void {
                  throw new Error('Function not implemented.')
                } } /> },
                { path: "products/:id", element: <ProductDetail /> },
                {
                path: "cart",
                element: <CartPage cart={[]} products={[]} onUpdateQuantity={function (id: number, quantity: number): void {
                  throw new Error('Function not implemented.')
                } } onRemove={function (id: number): void {
                  throw new Error('Function not implemented.')
                } } onClear={function (): void {
                  throw new Error('Function not implemented.')
                } } onCheckout={function (): void {
                  throw new Error('Function not implemented.')
                } } totalPrice={0} />,
                }
             ]
            },
            {
              path: "/about",
              element: <About />,
            },
            {
              path: "*",
              element: <NotFound />,
            },
          ],
    },
    
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
