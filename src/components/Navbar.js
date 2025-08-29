import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; 
import logo from '../assets/logo.png'

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <ul className="navbar-links">
        <li><a onClick={() => navigate('/login')}>Login</a></li>
        <li><a onClick={() => navigate('/signup')}>Sign up</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;