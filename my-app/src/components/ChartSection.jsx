import { BarChart3, TrendingUp } from "lucide-react";

export default function ChartSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Investment Overview Chart */}
      <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:border-slate-600/50 transition-colors">
        <div className="relative p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Investment Overview
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Last 6 months
              </p>
            </div>
            <BarChart3 className="w-6 h-6 text-slate-400" />
          </div>

          {/* Chart */}
          <div className="space-y-4">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
              <div key={month}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm text-slate-400 font-medium w-10">
                    {month}
                  </span>
                  <span className="text-xs text-slate-500">$0</span>
                </div>
                <div className="flex-1 bg-slate-700/30 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.random() * 60}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-xs sm:text-sm text-slate-400">Earning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-500"></div>
              <span className="text-xs sm:text-sm text-slate-400">
                Investment
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profit Analysis Chart */}
      <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:border-slate-600/50 transition-colors">
        <div className="relative p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Profit Analysis
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Growth trend
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </div>

          {/* Simple Card Stats */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl p-4 border border-slate-600/30 hover:border-cyan-500/30 transition-colors">
              <p className="text-slate-400 text-xs font-semibold mb-2">
                Average Profit
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl sm:text-3xl font-bold text-cyan-400">
                  $0
                </p>
                <span className="text-xs text-emerald-400">↑ 0%</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl p-4 border border-slate-600/30 hover:border-emerald-500/30 transition-colors">
              <p className="text-slate-400 text-xs font-semibold mb-2">
                Max Profit
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl sm:text-3xl font-bold text-emerald-400">
                  $0
                </p>
                <span className="text-xs text-slate-500">This month</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl p-4 border border-slate-600/30 hover:border-orange-500/30 transition-colors">
              <p className="text-slate-400 text-xs font-semibold mb-2">
                Total ROI
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl sm:text-3xl font-bold text-orange-400">
                  0%
                </p>
                <span className="text-xs text-slate-500">Return rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
