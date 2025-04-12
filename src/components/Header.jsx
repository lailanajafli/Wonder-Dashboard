// Router
import { Link, NavLink, useNavigate } from "react-router-dom";
// Icons
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Checked out👋", {
      position: "bottom-right",
    });

    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to="/">
              <img
                src="https://wonder-theme-beauty.myshopify.com/cdn/shop/files/Path_850.svg?v=1707730148&width=226"
                alt="logo"
              />
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
            <button onClick={handleLogout} className="logOut">
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
