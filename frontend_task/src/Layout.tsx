import { NavLink, Outlet } from "react-router-dom"

function Layout() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md transition-colors duration-200 ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
    }`;

  return (
    <>
      <div>
      <nav style={{ marginBottom: "20px" }}>
        <NavLink className={navLinkClass} to="/">Home</NavLink>
        
        {/* <NavLink className={navLinkClass} to="/products">Product</NavLink>
        <NavLink className={navLinkClass} to="/cart">Cart</NavLink> */}
        <NavLink className={navLinkClass} to="/about">about</NavLink>
      </nav>
      
      <main>
        <Outlet /> 
      </main>
    </div>
    </>
  )
}

export default Layout
