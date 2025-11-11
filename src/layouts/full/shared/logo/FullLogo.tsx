
import { Link } from 'react-router-dom';

const FullLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/assets/logo.png" // Update this path to your actual logo path
        alt="Logo"
        className="h-10 w-auto"
      />
    </Link>
  );
};

export default FullLogo;
