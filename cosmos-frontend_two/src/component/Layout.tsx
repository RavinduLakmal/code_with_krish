import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Customers</Link>
          </li>
          <li>
            <Link to="/products">Product</Link>
          </li>
          
          <li>
            <Link to="/orders">Order</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;