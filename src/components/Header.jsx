// Router
import { Link, NavLink } from "react-router-dom";

// Images
import logo from "../assets/images/logo.webp";

// Icons
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to="/">
              <img src="https://wonder-theme-beauty.myshopify.com/cdn/shop/files/Path_850.svg?v=1707730148&width=226" alt="logo" />
            </Link>
          </div>
          <nav className="navBar">
            <ul className="navList">
              <li className="navItem">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="navItem">
                <NavLink to="/all-products">All Products</NavLink>
              </li>
              <li className="navItem">
                <NavLink to="/create-product">Add new product</NavLink>
              </li>
            </ul>
          </nav>
          <div className="userArea">
            <button className="logOut">
              LOG OUT
              <FaSignOutAlt />
            </button>
            <Link className="login" to="/login">
              <FaUserCircle />
              <span>LOG IN</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
