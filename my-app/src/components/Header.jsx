import { Menu, Bell, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-slate-300 hover:text-white p-2 hover:bg-slate-700 rounded-lg transition"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex-1"></div>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-slate-400">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
          title="Logout"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
