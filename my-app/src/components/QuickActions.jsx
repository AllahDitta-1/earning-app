import {
  BarChart3,
  Heart,
  MessageSquare,
  Settings,
  Download,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();
  const actions = [
    {
      icon: BarChart3,
      label: "View Reports",
      color: "from-blue-500 to-blue-600",
      action: () => navigate("/transactions"),
    },
    {
      icon: Download,
      label: "Download App",
      color: "from-purple-500 to-purple-600",
      action: () => alert("App download link coming soon!"),
    },
    {
      icon: Share2,
      label: "Share Profile",
      color: "from-pink-500 to-pink-600",
      action: () => navigate("/referrals"),
    },
    {
      icon: Settings,
      label: "Settings",
      color: "from-slate-600 to-slate-700",
      action: () => navigate("/security-settings"),
    },
    {
      icon: MessageSquare,
      label: "Support",
      color: "from-green-500 to-green-600",
      action: () => navigate("/help-support"),
    },
    {
      icon: Heart,
      label: "Favorites",
      color: "from-red-500 to-red-600",
      action: () => alert("Favorites feature coming soon!"),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8">
      <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={action.action}
              className="flex flex-col items-center gap-3 p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition group"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-white group-hover:scale-110 transition`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-slate-300 text-center">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
