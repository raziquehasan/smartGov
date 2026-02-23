import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-40">
      {/* Brand Logo */}
      <Link to="/" className="font-bold text-2xl text-blue-900 tracking-tight">
        Smart<span className="text-blue-600">Gov</span>
      </Link>
      
      <div className="flex gap-6 items-center">
        {/* Common Link */}
        <Link to="/" className="text-slate-600 font-medium hover:text-blue-600 transition">Home</Link>
        
        {isAuthenticated ? (
          <>
            {/* Logged In View */}
            <Link to="/dashboard" className="text-slate-600 font-medium hover:text-blue-600 transition">Dashboard</Link>
            <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Citizen</p>
                <p className="text-sm font-bold text-slate-700">{user?.name}</p>
              </div>
              <button 
                onClick={logout}
                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          /* Logged Out View */
          <div className="flex items-center gap-3">
            <Link 
              to="/login" 
              className="text-slate-600 font-bold px-4 py-2 hover:text-blue-600 transition"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;