import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div className="container navbar">
        <div className="logo">
          <Link to="/">Feedback App</Link>
        </div>
        <div className="nav">
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/about"
          >
            About
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
