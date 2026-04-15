import { TrendingUp, Zap, Pause, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LiveEarning() {
  const [earning, setEarning] = useState("0.000000");
  const [isAnimating, setIsAnimating] = useState(true);
  const navigate = useNavigate();
  const { user, calculateLiveEarning } = useAuth();

  useEffect(() => {
    // Calculate initial earnings ($1 per hour per investment)
    const baseEarning = calculateLiveEarning(user?.investments || []);
    setEarning(baseEarning.toFixed(6));

    if (!isAnimating) return;

    const interval = setInterval(() => {
      // $1 per hour per ACTIVE investment only
      const activeInvestments = (user?.investments || []).filter(
        (inv) => inv.status === "active",
      );
      const numberOfActiveInvestments = activeInvestments.length;
      const hourlyEarning = numberOfActiveInvestments * 1; // $1 per hour per active investment
      const secondlyEarning = hourlyEarning / 3600; // Convert to per second

      setEarning((prev) => {
        const current = parseFloat(prev);
        return (current + secondlyEarning).toFixed(6);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAnimating, user?.investments, calculateLiveEarning]);

  return (
    <div className="group relative bg-gradient-to-br from-emerald-600/10 via-emerald-600/5 to-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:via-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500"></div>

      <div className="relative p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Live Earning
              </h3>
              <p className="text-emerald-300 text-xs sm:text-sm flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Real time updates
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600/50 to-teal-600/50 hover:from-emerald-600/70 hover:to-teal-600/70 border border-emerald-500/30 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 w-fit"
          >
            {isAnimating ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Resume</span>
              </>
            )}
          </button>
        </div>

        {/* Earning Display */}
        <div className="mb-10 bg-gradient-to-r from-slate-700/30 to-slate-800/30 border border-emerald-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
          <p className="text-slate-400 text-xs sm:text-sm font-semibold mb-3">
            Current Earning
          </p>
          <p className="text-5xl sm:text-6xl lg:text-7xl font-black text-white font-mono tracking-wider break-words">
            ${earning}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/plans")}
            className="group/btn relative bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 shadow-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition-all"></div>
            <div className="relative flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm sm:text-base font-semibold">
                Activate Now
              </span>
            </div>
          </button>
          <button
            onClick={() => navigate("/add-funds")}
            className="group/btn relative bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/30 shadow-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition-all"></div>
            <div className="relative flex items-center justify-center gap-2">
              <span className="text-lg">💰</span>
              <span className="text-sm sm:text-base font-semibold">
                Add Funds
              </span>
            </div>
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="text-center">
            <p className="text-slate-400 text-xs sm:text-sm mb-3">
              📊 Your earnings are calculated in real-time based on your active
              investments
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                Active
              </span>
              <span>•</span>
              <span>Last 24h: +$0.00</span>
              <span>•</span>
              <span>This Month: +$0.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
