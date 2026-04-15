import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Target,
  Users,
  BarChart3,
  LogOut,
  X,
  User,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const { logout } = useAuth();
  const [expandedSections, setExpandedSections] = useState({});

  // Load expanded sections from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebarSections");
    if (saved) {
      setExpandedSections(JSON.parse(saved));
    } else {
      // Default: Finance and Account are expanded
      setExpandedSections({ finance: true, account: true });
    }
  }, []);

  // Save expanded sections to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("sidebarSections", JSON.stringify(expandedSections));
  }, [expandedSections]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
      id: "dashboard",
    },
    {
      icon: Wallet,
      label: "Finance",
      id: "finance",
      submenu: [
        { label: "My Wallet", href: "/wallet" },
        { label: "Add Funds", href: "/add-funds" },
        { label: "Withdraw Funds", href: "/withdraw" },
      ],
    },
    {
      icon: TrendingUp,
      label: "Investment Plans",
      href: "/plans",
      id: "plans",
    },
    { icon: Target, label: "Goals", href: "/goals", id: "goals" },
    { icon: Users, label: "My Referrals", href: "/referrals", id: "referrals" },
    {
      icon: BarChart3,
      label: "Transactions",
      href: "/transactions",
      id: "transactions",
    },
    {
      icon: User,
      label: "Account",
      id: "account",
      submenu: [
        { label: "My Profile", href: "/profile" },
        { label: "Security Settings", href: "/security-settings" },
      ],
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      href: "/help-support",
      id: "help",
    },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 flex flex-col transition-all z-50 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">💰</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              EarnHub
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1 hover:bg-slate-800 rounded"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 font-medium text-sm hover:text-white hover:bg-slate-800 rounded-lg transition"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 ml-auto transition-transform ${
                        expandedSections[item.id] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedSections[item.id] && (
                    <div className="pl-8 space-y-2 mt-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.href}
                          to={subitem.href}
                          onClick={() => setOpen(false)}
                          className={`block px-4 py-2 rounded-lg text-sm transition ${
                            isActive(subitem.href)
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                              : "text-slate-400 hover:text-white hover:bg-slate-800"
                          }`}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
