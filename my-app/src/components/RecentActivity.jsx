import {
  Search,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

export default function RecentActivity() {
  const activities = [];

  return (
    <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:border-slate-600/50 transition-colors">
      <div className="relative p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Recent Activity
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Transaction history
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative hidden sm:block flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-slate-700/50 border border-slate-600/50 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all w-full sm:w-48"
              />
            </div>
            <button className="bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 text-slate-300 hover:text-white p-2.5 sm:p-2 rounded-xl transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="hidden md:inline text-xs">Filter</span>
            </button>
            <button className="bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 text-slate-300 hover:text-white p-2.5 sm:p-2 rounded-xl transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden md:inline text-xs">3 Days</span>
            </button>
          </div>
        </div>

        {/* Empty State */}
        {activities.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-slate-400 text-sm sm:text-base mb-2">
              No transaction history found!
            </p>
            <p className="text-slate-500 text-xs sm:text-sm">
              Start investing to see your transactions here
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="bg-slate-700/20 hover:bg-slate-700/40 border border-slate-600/30 hover:border-slate-500/50 rounded-2xl p-4 sm:p-5 transition-all"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <ArrowUpRight className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-300 font-semibold text-sm truncate">
                        Deposit
                      </p>
                      <p className="text-slate-500 text-xs">Mar 10, 2026</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-bold text-sm sm:text-base">
                      + $500.00
                    </p>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 mt-1">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call To Action */}
        <div className="mt-8 sm:mt-12 pt-8 border-t border-slate-700/50">
          <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 text-center">
            <h4 className="text-white font-bold text-lg sm:text-xl mb-3">
              Start Earning Today
            </h4>
            <p className="text-slate-300 text-sm mb-5">
              Make your first deposit and begin your investment journey
            </p>
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 shadow-lg">
              Make First Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
