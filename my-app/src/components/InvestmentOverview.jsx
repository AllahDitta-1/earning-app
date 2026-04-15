import { TrendingUp, Zap, Target, Users, Play } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function InvestmentOverview() {
  const { user, activateInvestment } = useAuth();
  const [activatingId, setActivatingId] = useState(null);

  const handleActivate = (investmentId) => {
    setActivatingId(investmentId);
    setTimeout(() => {
      try {
        activateInvestment(investmentId);
        setActivatingId(null);
      } catch (error) {
        alert(error.message);
        setActivatingId(null);
      }
    }, 1000);
  };

  const inactiveInvestments = (user?.investments || []).filter(
    (inv) => inv.status === "inactive",
  );
  const activeInvestments = (user?.investments || []).filter(
    (inv) => inv.status === "active",
  );

  return (
    <div className="space-y-6">
      {/* Active Investments Section */}
      {activeInvestments.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <Zap className="w-6 h-6 text-amber-400" />
            Active Investments ({activeInvestments.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeInvestments.map((inv) => (
              <div
                key={inv.id}
                className="group relative bg-gradient-to-br from-amber-600/10 via-orange-600/10 to-yellow-600/10 backdrop-blur-xl border border-amber-500/30 rounded-2xl overflow-hidden"
              >
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-amber-400 font-semibold text-sm">
                        {inv.plan}
                      </p>
                      <p className="text-white font-bold text-2xl mt-1">
                        ${inv.amount}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>Daily Return: {inv.dailyReturn}%</p>
                    <p>Earning: $1/hour</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-amber-500/20">
                    <p className="text-amber-300 font-semibold text-sm">
                      ✓ Active & Earning
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Activation Section */}
      {inactiveInvestments.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <Target className="w-6 h-6 text-cyan-400" />
            Pending Activation ({inactiveInvestments.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inactiveInvestments.map((inv) => (
              <div
                key={inv.id}
                className="group relative bg-gradient-to-br from-cyan-600/10 via-blue-600/10 to-teal-600/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl overflow-hidden"
              >
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-cyan-400 font-semibold text-sm">
                        {inv.plan}
                      </p>
                      <p className="text-white font-bold text-2xl mt-1">
                        ${inv.amount}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Play className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>Daily Return: {inv.dailyReturn}%</p>
                    <p>Ready to earn: $1/hour</p>
                  </div>
                  <button
                    onClick={() => handleActivate(inv.id)}
                    disabled={activatingId === inv.id}
                    className={`w-full mt-4 py-2 rounded-lg font-semibold transition-all ${
                      activatingId === inv.id
                        ? "bg-cyan-500/30 text-cyan-300 opacity-50"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white hover:shadow-lg hover:shadow-cyan-500/30"
                    }`}
                  >
                    {activatingId === inv.id ? "Activating..." : "Activate Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Investments Section */}
      {activeInvestments.length === 0 && inactiveInvestments.length === 0 && (
        <>
          <div className="group relative bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-teal-600/10 backdrop-blur-xl border border-cyan-500/30 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-teal-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-teal-500/5 transition-all duration-500"></div>
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  Active Investment
                </h3>
              </div>
              <div className="text-center py-8 sm:py-12">
                <p className="text-slate-300 mb-6 text-sm sm:text-base max-w-md mx-auto">
                  Ready to earn? Activate a plan now and start enjoying daily
                  returns!
                </p>
                <a
                  href="/plans"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-6 sm:px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 inline-flex items-center gap-2 shadow-lg"
                >
                  <span className="text-lg">+</span>
                  <span>Start Investment</span>
                </a>
              </div>
            </div>
          </div>

          {/* Two Column - My Rank & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* My Rank Section */}
            <div className="group relative bg-gradient-to-br from-amber-600/10 via-orange-600/10 to-yellow-600/10 backdrop-blur-xl border border-amber-500/30 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-orange-500/0 to-yellow-500/0 group-hover:from-amber-500/5 group-hover:via-orange-500/5 group-hover:to-yellow-500/5 transition-all duration-500"></div>
              <div className="relative p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-8">
                  My Rank
                </h3>
                <div className="flex flex-col items-center gap-6">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 animate-pulse"></div>
                    {/* Middle ring */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-500 to-orange-600"></div>
                    {/* Inner circle */}
                    <div className="absolute inset-4 rounded-full bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center shadow-xl">
                      <span className="text-4xl sm:text-5xl font-black text-white">
                        0
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs sm:text-sm mb-2">
                      Current Rank
                    </p>
                    <p className="text-white text-lg sm:text-2xl font-bold">
                      No Rank Yet
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress & Stats */}
            <div className="group relative bg-gradient-to-br from-purple-600/10 via-rose-600/10 to-pink-600/10 backdrop-blur-xl border border-purple-500/30 rounded-3xl overflow-hidden">
              <div className="relative p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                  Progress
                </h3>

                {/* Progress Item 1 */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-300 text-sm font-semibold flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      Team Builder
                    </span>
                    <span className="text-purple-400 font-bold text-lg">
                      0%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                  <p className="text-slate-400 text-xs mt-2">Almost there!</p>
                </div>

                {/* Progress Item 2 */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-300 text-sm font-semibold flex items-center gap-2">
                      <Users className="w-4 h-4 text-rose-400" />
                      Next Goal
                    </span>
                    <span className="text-rose-400 font-bold text-lg">
                      $0 / $10
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-rose-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                  <p className="text-slate-400 text-xs mt-2">$10 more needed</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* My Rank & Progress - Shown always */}
      {(activeInvestments.length > 0 || inactiveInvestments.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* My Rank Section */}
          <div className="group relative bg-gradient-to-br from-amber-600/10 via-orange-600/10 to-yellow-600/10 backdrop-blur-xl border border-amber-500/30 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-orange-500/0 to-yellow-500/0 group-hover:from-amber-500/5 group-hover:via-orange-500/5 group-hover:to-yellow-500/5 transition-all duration-500"></div>
            <div className="relative p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-8">
                My Rank
              </h3>
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 animate-pulse"></div>
                  {/* Middle ring */}
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-500 to-orange-600"></div>
                  {/* Inner circle */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center shadow-xl">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      {activeInvestments.length}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-slate-400 text-xs sm:text-sm mb-2">
                    Active Investments
                  </p>
                  <p className="text-white text-lg sm:text-2xl font-bold">
                    {activeInvestments.length > 0
                      ? "Earning Now"
                      : "Get Started"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress & Stats */}
          <div className="group relative bg-gradient-to-br from-purple-600/10 via-rose-600/10 to-pink-600/10 backdrop-blur-xl border border-purple-500/30 rounded-3xl overflow-hidden">
            <div className="relative p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Progress
              </h3>

              {/* Progress Item 1 */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-300 text-sm font-semibold flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    Active Investments
                  </span>
                  <span className="text-purple-400 font-bold text-lg">
                    {activeInvestments.length}
                  </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((activeInvestments.length / 5) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  ${activeInvestments.reduce((sum, inv) => sum + inv.amount, 0)}
                  / $500
                </p>
              </div>

              {/* Progress Item 2 */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-300 text-sm font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4 text-rose-400" />
                    Total Invested
                  </span>
                  <span className="text-rose-400 font-bold text-lg">
                    $
                    {activeInvestments.reduce(
                      (sum, inv) => sum + inv.amount,
                      0,
                    )}
                  </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-rose-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((activeInvestments.reduce((sum, inv) => sum + inv.amount, 0) / 500) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-slate-400 text-xs mt-2">Keep growing!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
