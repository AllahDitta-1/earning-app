import {
  Eye,
  EyeOff,
  Copy,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const copyToClipboard = () => {
    navigator.clipboard.writeText("0.00");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Balance Card */}
      <div className="lg:col-span-2 group relative bg-gradient-to-br from-purple-600/10 via-purple-600/5 to-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500"></div>

        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-slate-400 text-xs sm:text-sm font-semibold mb-3">
                Total Balance
              </p>
              <div className="flex items-baseline gap-3 flex-wrap">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                  {showBalance
                    ? `$${(user?.balance || 0).toFixed(2)}`
                    : "••••••••"}
                </h2>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition text-slate-400 hover:text-white"
                  title={showBalance ? "Hide balance" : "Show balance"}
                >
                  {showBalance ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>

          {/* Status */}
          <div className="mb-8 p-4 sm:p-5 bg-slate-700/20 hover:bg-slate-700/30 border border-slate-600/30 rounded-2xl transition-colors">
            <p className="text-slate-400 text-xs sm:text-sm mb-2 font-semibold">
              Deposit Wallet
            </p>
            <p className="text-white font-bold text-lg">
              ${(user?.totalDeposit || 0).toFixed(2)}
            </p>
            <p className="text-emerald-400 text-xs sm:text-sm flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4" />+
              {(
                (user?.balance / (user?.totalDeposit || 1)) * 100 -
                100
              ).toFixed(1)}
              % this month
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/add-funds")}
              className="group/btn relative bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition-all"></div>
              <div className="relative flex flex-col items-center gap-1">
                <ArrowUpRight className="w-5 h-5" />
                <span className="text-xs sm:text-sm font-semibold">
                  Deposit
                </span>
              </div>
            </button>
            <button
              onClick={() => navigate("/withdraw")}
              className="group/btn relative bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition-all"></div>
              <div className="relative flex flex-col items-center gap-1">
                <ArrowDownLeft className="w-5 h-5" />
                <span className="text-xs sm:text-sm font-semibold">
                  Withdraw
                </span>
              </div>
            </button>
            <button
              onClick={() => navigate("/referrals")}
              className="group/btn relative bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition-all"></div>
              <div className="relative flex flex-col items-center gap-1">
                <span className="text-lg">🤝</span>
                <span className="text-xs sm:text-sm font-semibold">Refer</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Side Stats */}
      <div className="space-y-4 sm:space-y-5">
        {/* Referral Earning */}
        <div className="group relative bg-gradient-to-br from-purple-600/10 via-purple-600/5 to-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-5 sm:p-6 hover:border-purple-500/50 transition-colors">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl sm:text-2xl">👥</span>
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm font-semibold">
                Referral Earning
              </p>
              <p className="text-lg sm:text-xl font-bold text-purple-300">
                ${(user?.referralEarning || 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Total Invested */}
        <div className="group relative bg-gradient-to-br from-orange-600/10 via-orange-600/5 to-slate-900/50 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-5 sm:p-6 hover:border-orange-500/50 transition-colors">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl sm:text-2xl">💰</span>
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm font-semibold">
                Total Invested
              </p>
              <p className="text-lg sm:text-xl font-bold text-orange-300">
                ${(user?.totalInvested || 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stat */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="group relative bg-gradient-to-br from-emerald-600/10 via-emerald-600/5 to-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 hover:border-emerald-500/50 transition-colors">
            <p className="text-slate-400 text-xs font-semibold mb-2">Deposit</p>
            <p className="text-lg font-bold text-emerald-300">
              ${(user?.totalDeposit || 0).toFixed(2)}
            </p>
          </div>
          <div className="group relative bg-gradient-to-br from-red-600/10 via-red-600/5 to-slate-900/50 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4 hover:border-red-500/50 transition-colors">
            <p className="text-slate-400 text-xs font-semibold mb-2">
              Withdrawn
            </p>
            <p className="text-lg font-bold text-red-300">
              ${(user?.totalWithdrawn || 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
