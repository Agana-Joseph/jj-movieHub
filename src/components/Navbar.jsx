import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-neutral-600 to-neutral-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-neutral-200 transition-colors">
          JJ-Movie-Hub
        </Link>
        <div className="flex gap-4">
          <Link 
            to="/" 
            className="px-3 py-1 rounded hover:bg-neutral-600 transition-colors"
          >
            Movie Finder
          </Link>
          <Link 
            to="/ai-recommendations" 
            className="px-3 py-1 rounded hover:bg-neutral-600 transition-colors"
          >
            AI Recommendations
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;