import './Nav.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Auth from '../../AuthComponets/Auth';

function Nav() {
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole?.toLowerCase());

    const count = localStorage.getItem('cartCount');
    if (count) setCartCount(Number(count));

    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    setMenuOpen(false); // ✅ close mobile menu
    navigate('/login');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = (name) =>
    setOpenDropdown(openDropdown === name ? null : name);

  return (
    <>
      <Auth />

      <header className="header-area header-sticky">
        <div className="container">
          <nav className="main-nav">

            {/* LOGO */}
            {role !== 'admin' && (
              <Link to="/" className="logo">
                <img src="assets/images/L (2).png" alt="logo" />
              </Link>
            )}

            {/* NAV MENU */}
            <ul className="nav" style={{ display: menuOpen ? 'block' : '' }}>

              {/* ================= ADMIN ================= */}
              {role === 'admin' && (
                <>
                  <li><Link to="/admin">Admin Home</Link></li>

                  <li
                    className={`dropdown ${openDropdown === 'master' ? 'open' : ''}`}
                    onClick={() => toggleDropdown('master')}
                  >
                    <span>Master Data ▼</span>
                    <ul className="dropdown-menu">
                      <li><Link to="/add-category">Add Category</Link></li>
                      <li><Link to="/add-subcategory">Add Subcategory</Link></li>
                      <li><Link to="/admin/manage-ads">Manage ADS</Link></li>
                    </ul>
                  </li>

                  <li
                    className={`dropdown ${openDropdown === 'orders' ? 'open' : ''}`}
                    onClick={() => toggleDropdown('orders')}
                  >
                    <span>Orders & Users ▼</span>
                    <ul className="dropdown-menu">
                      <li><Link to="/manage-oders">Manage Orders</Link></li>
                      <li><Link to="/all_custom_oders">Custom Cake Orders</Link></li>
                      <li><Link to="/admin/contacts">Manage Contacts</Link></li>
                      <li><Link to="/manage-users">Manage Users</Link></li>
                    </ul>
                  </li>

                  <li className="logout-li">
                    <button className="logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )}

              {/* ================= USER ================= */}
              {role === 'user' && (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                  <li><Link to="/orders">My Orders</Link></li>
                  <li><Link to="/customcake">Customize Your Cake</Link></li>
                  <li><Link to="/my-custom-orders">My Custom Cakes</Link></li>

                  <li>
                    <Link to="/cart" className="cart-link">
                      🛒 Cart <span className="cart-badge">{cartCount}</span>
                    </Link>
                  </li>

                  <li className="logout-li">
                    <button className="logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )}

              {/* ================= GUEST ================= */}
              {!role && (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </ul>

            {/* MOBILE MENU BUTTON */}
            <div
              className={`menu-trigger ${menuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              <span>Menu</span>
            </div>

          </nav>
        </div>
      </header>
    </>
  );
}

export default Nav;
