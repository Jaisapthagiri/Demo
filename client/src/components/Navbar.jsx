// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const adminAuth = localStorage.getItem("admin-auth") === "true";
    const userAuth = localStorage.getItem("user-auth") === "true";
    setIsAdmin(adminAuth);
    setIsUser(userAuth);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    localStorage.removeItem("VITE_ADMIN_EMAIL");
    localStorage.removeItem("VITE_ADMIN_PASSWORD");
    localStorage.removeItem("user-auth");
    setIsAdmin(false);
    setIsUser(false);
    navigate("/");
  };

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center
     justify-between z-20 bg-white text-gray-700 shadow transition-all">
      <Link to="/" className="text-indigo-600 font-bold text-xl">
        Intern
      </Link>

      <ul className="md:flex hidden items-center gap-10 text-sm">
        <li><Link to="/" className="hover:text-gray-500/80 transition">Home</Link></li>

        {!isAdmin && !isUser && (
          <>
            <li><Link to="/register" className="hover:text-gray-500/80 transition">Login</Link></li>
            <li><Link to="/admin" className="hover:text-gray-500/80 transition">Admin</Link></li>
          </>
        )}

        {isUser && (
          <li>
            <button onClick={handleLogout} className="hover:text-red-500 transition">
              Logout
            </button>
          </li>
        )}

        {isAdmin && (
          <>
            <li><Link to="/admin-view" className="hover:text-gray-500/80 transition">Dashboard</Link></li>
            <li>
              <button onClick={handleLogout} className="hover:text-red-500 transition">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>

      <button
        className="menu-btn md:hidden active:scale-90 transition"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="menu-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#000">
          <path d="M3 7h24M3 14h24M3 21h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {menuOpen && (
        <div className="mobile-menu absolute top-[70px] left-0 w-full bg-white p-6 md:hidden">
          <ul className="flex flex-col space-y-4 text-lg">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>

            {!isAdmin && !isUser && (
              <>
                <li><Link to="/register" onClick={() => setMenuOpen(false)}>Login</Link></li>
                <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>
              </>
            )}

            {isUser && (
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-red-500"
                >
                  Logout
                </button>
              </li>
            )}

            {isAdmin && (
              <>
                <li><Link to="/admin-view" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
                <li>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-red-500"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
