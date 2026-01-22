import { Outlet, NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <NavLink 
        to="/product" 
        className={({ isActive }) => isActive ? "active-link" : undefined}
      >
        Products
      </NavLink>
      {" | "} 
      <NavLink 
        to="/cart" 
        className={({ isActive }) => isActive ? "active-link" : undefined}
      >
        Cart
      </NavLink>
      </nav>
      <Outlet /> 
    </div>
  );
}
