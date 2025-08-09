import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; 
import logo from '../assets/logo.png'

const AuthenticatedNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <ul className="navbar-links">
        <li><a onClick={() => navigate('/')}>Home</a></li>
        <li><a onClick={() => navigate('/inventory')}>Inventory</a></li>
        <li><a onClick={() => navigate('/allChoreos')}>My choreographies</a></li>
        <li><a onClick={() => navigate('/profile')}>Profile</a></li>
      </ul>
    </nav>
  );
};

export default AuthenticatedNavbar;