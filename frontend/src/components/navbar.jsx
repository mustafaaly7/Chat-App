import { LogOut, Menu, Settings, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { authUser, checkAuth } = useAuthStore();
  
    const handleLogout = async () => {
      try {
        await fetch("/auth/logout", { method: "POST", credentials: "include" });
        toast.success("Logged out");
        await checkAuth();
        navigate("/login");
      } catch (err) {
        toast.error("Logout failed");
      }
    };
  
    return (
      <header className="w-full bg-base-200 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-xl">
              <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-wide">MyApp</span>
          </div>
  
          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-sm btn-ghost">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
  
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-4 items-center">
            <Link to="/profile" className="btn btn-sm btn-ghost flex gap-1">
              <UserCircle size={18} />
              Profile
            </Link>
            <Link to="/settings" className="btn btn-sm btn-ghost flex gap-1">
              <Settings size={18} />
              Settings
            </Link>
            <button onClick={handleLogout} className="btn btn-sm btn-error text-white flex gap-1">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
  
        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="lg:hidden px-4 pb-4">
            <div className="flex flex-col gap-2">
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="btn btn-sm btn-ghost flex gap-1 justify-start"
              >
                <UserCircle size={18} />
                Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className="btn btn-sm btn-ghost flex gap-1 justify-start"
              >
                <Settings size={18} />
                Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="btn btn-sm btn-error text-white flex gap-1 justify-start"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>
    );
  };
