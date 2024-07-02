import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-400">
            Audio Separation
          </Link>
        </li>
        <li>
          <Link to="/vocal-remover" className="text-white hover:text-gray-400">
            Vocal Remover
          </Link>
        </li>
        <li>
          <Link to="/user-profile" className="text-white hover:text-gray-400">
            User Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
