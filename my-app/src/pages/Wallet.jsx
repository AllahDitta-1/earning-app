import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Wallet as WalletIcon,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Send,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Wallet() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showBalance, setShowBalance] = useState(true);

  const walletData = {
    totalBalance: 12450.75,
    deposit: 10000,
    earning: 2000.25,
    referral: 450.5,
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc811e7e8d646c",
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                My Wallet
              </h1>
              <p className="text-sm sm:text-base text-slate-400 mt-2">
                Manage your funds and wallet balance
              </p>
            </div>

            {/* Main Balance Card */}
            <div className="group relative bg-gradient-to-br from-purple-600/20 via-purple-600/10 to-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl overflow-hidden">
              <div className="relative p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <WalletIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        Total Balance
                      </p>
                      <h2 className="text-2xl sm:text-4xl font-bold text-white">
                        {showBalance
                          ? `$${walletData.totalBalance.toFixed(2)}`
                          : "••••••"}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 hover:bg-slate-700/30 rounded-lg transition"
                  >
                    {showBalance ? (
                      <Eye className="w-5 h-5 text-slate-400" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <a
                    href="/add-funds"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-2 sm:py-3 rounded-lg transition text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Deposit
                  </a>
                  <a
                    href="/withdraw"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-2 sm:py-3 rounded-lg transition text-sm"
                  >
                    <Send className="w-4 h-4" />
                    Withdraw
                  </a>
                  <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 sm:py-3 rounded-lg transition text-sm col-span-2 sm:col-span-1">
                    Transfer
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 sm:py-3 rounded-lg transition text-sm col-span-2 sm:col-span-1">
                    Request
                  </button>
                </div>
              </div>
            </div>

            {/* Balance Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Deposit Balance",
                  amount: walletData.deposit,
                  color: "from-blue-600 to-cyan-600",
                  icon: "💰",
                },
                {
                  label: "Earnings",
                  amount: walletData.earning,
                  color: "from-emerald-600 to-teal-600",
                  icon: "📈",
                },
                {
                  label: "Referral Bonus",
                  amount: walletData.referral,
                  color: "from-purple-600 to-pink-600",
                  icon: "👥",
                },
                {
                  label: "Pending Withdrawal",
                  amount: 0,
                  color: "from-orange-600 to-red-600",
                  icon: "⏳",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden hover:border-slate-600/50 transition p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-2xl">{item.icon}</div>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mb-2">
                    {item.label}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    ${item.amount.toFixed(2)}
                  </h3>
                </div>
              ))}
            </div>

            {/* Wallet Address */}
            <div className="group relative bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Wallet Address
              </h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  value={walletData.walletAddress}
                  readOnly
                  className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none"
                />
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition w-full sm:w-auto">
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="group relative bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Recent Transactions
              </h3>
              <div className="space-y-3">
                {[
                  {
                    desc: "Deposit via Bank",
                    amount: "+5,000.00",
                    color: "text-emerald-400",
                  },
                  {
                    desc: "Investment Payment",
                    amount: "-2,500.00",
                    color: "text-orange-400",
                  },
                  {
                    desc: "Daily Earning",
                    amount: "+125.50",
                    color: "text-emerald-400",
                  },
                ].map((tx, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-slate-700/30 last:border-0"
                  >
                    <span className="text-white text-sm">{tx.desc}</span>
                    <span className={`font-semibold text-sm ${tx.color}`}>
                      {tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
