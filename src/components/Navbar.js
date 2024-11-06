// // src/components/Navbar.js
// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav>
//       <Link to="/">Home</Link>
//       {user ? (
//         <>
//           <Link to="/create">Create Post</Link>
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <Link to="/login">Login</Link>
//           <Link to="/register">Register</Link>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React, { useContext, } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const loc = useLocation();
  // let path = location.pathname;
  const isActive = (path) => loc.pathname === path;
console.log("location",loc);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className={isActive('/') ? 'active nav-link' : 'nav-link'} to="/">Home</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className={isActive('/login') ? 'active nav-link' : 'nav-link'} to="/create">Create Post</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger ml-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={isActive('/login') ? 'active nav-link' : 'nav-link'} to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive('/register') ? 'active nav-link' : 'nav-link'} to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
