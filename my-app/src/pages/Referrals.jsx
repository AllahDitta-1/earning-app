import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Users,
  Copy,
  Share2,
  TrendingUp,
  CheckCircle,
  Clock,
  Mail,
  QrCode,
} from "lucide-react";

export default function Referrals() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const referralCode = "EARN2024ABC";
  const referralLink = `https://earnhub.com?ref=${referralCode}`;

  const referralStats = {
    totalReferrals: 24,
    activeReferrals: 18,
    totalEarned: 3600,
    pendingRewards: 450,
  };

  const referrals = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      joinDate: "2026-02-15",
      investment: 5000,
      earnings: 450,
      status: "active",
      commission: 250,
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@example.com",
      joinDate: "2026-02-20",
      investment: 2500,
      earnings: 200,
      status: "active",
      commission: 125,
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily@example.com",
      joinDate: "2026-01-10",
      investment: 10000,
      earnings: 1200,
      status: "active",
      commission: 500,
    },
    {
      id: 4,
      name: "Alex Wilson",
      email: "alex@example.com",
      joinDate: "2026-03-01",
      investment: 1000,
      earnings: 50,
      status: "pending",
      commission: 100,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                My Referrals
              </h1>
              <p className="text-sm sm:text-base text-slate-400 mt-2">
                Earn commissions by inviting friends
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  label: "Total Referrals",
                  value: referralStats.totalReferrals,
                  icon: "👥",
                  color: "from-blue-600 to-cyan-600",
                },
                {
                  label: "Active Referrals",
                  value: referralStats.activeReferrals,
                  icon: "✅",
                  color: "from-emerald-600 to-teal-600",
                },
                {
                  label: "Total Earned",
                  value: `$${referralStats.totalEarned.toLocaleString()}`,
                  icon: "💰",
                  color: "from-purple-600 to-pink-600",
                },
                {
                  label: "Pending Rewards",
                  value: `$${referralStats.pendingRewards}`,
                  icon: "⏳",
                  color: "from-orange-600 to-red-600",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden hover:border-slate-600/50 transition p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-2xl sm:text-3xl">{stat.icon}</div>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mb-2">
                    {stat.label}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {stat.value}
                  </h3>
                </div>
              ))}
            </div>

            {/* Referral Link */}
            <div className="group relative bg-gradient-to-br from-purple-600/20 via-purple-600/10 to-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl overflow-hidden p-6 sm:p-10">
              <h3 className="text-xl font-bold text-white mb-6">
                Share Your Referral Link
              </h3>

              {/* Referral Code */}
              <div className="mb-6">
                <label className="block text-slate-400 text-sm mb-3">
                  Your Referral Code
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={referralCode}
                    readOnly
                    className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white font-mono focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(referralCode);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition w-full sm:w-auto"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Referral Link */}
              <div className="mb-6">
                <label className="block text-slate-400 text-sm mb-3">
                  Your Referral Link
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white text-sm focus:outline-none overflow-x-auto"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition w-full sm:w-auto"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: "Email", icon: Mail },
                  { name: "Share", icon: Share2 },
                  { name: "QR Code", icon: QrCode },
                  { name: "Copy Link", icon: Copy },
                ].map((btn, idx) => (
                  <button
                    key={idx}
                    className="flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold py-2 rounded-lg transition text-sm"
                  >
                    <btn.icon className="w-4 h-4" />
                    {btn.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Commission Structure */}
            <div className="group relative bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-2xl overflow-hidden p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Commission Structure
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  {
                    level: "1st Level",
                    commission: "5%",
                    description: "Direct referrals",
                  },
                  {
                    level: "2nd Level",
                    commission: "2%",
                    description: "Referrals of your referrals",
                  },
                  {
                    level: "Bonus",
                    commission: "+1%",
                    description: "If 5+ active referrals",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 border-b border-blue-500/20 last:border-0"
                  >
                    <div>
                      <p className="text-white font-semibold">{item.level}</p>
                      <p className="text-slate-400 text-xs">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-blue-400 font-bold">
                      {item.commission}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Referrals Table */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-700/30">
                <h3 className="text-lg font-bold text-white">My Referrals</h3>
              </div>

              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50 border-b border-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Join Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Investment
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Commission
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {referrals.map((ref) => (
                      <tr
                        key={ref.id}
                        className="hover:bg-slate-700/20 transition"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">{ref.name}</p>
                            <p className="text-slate-400 text-xs">
                              {ref.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-sm">
                          {new Date(ref.joinDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-white font-semibold">
                          ${ref.investment.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-emerald-400 font-bold">
                          ${ref.commission}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                              ref.status === "active"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {ref.status === "active" ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            {ref.status.charAt(0).toUpperCase() +
                              ref.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="sm:hidden space-y-3 p-4">
                {referrals.map((ref) => (
                  <div
                    key={ref.id}
                    className="bg-slate-700/20 border border-slate-600/30 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-white font-medium">{ref.name}</p>
                        <p className="text-slate-400 text-xs">{ref.email}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 whitespace-nowrap ml-2 ${
                          ref.status === "active"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {ref.status === "active" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {ref.status.charAt(0).toUpperCase() +
                          ref.status.slice(1)}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Join Date:</span>
                        <span className="text-white">
                          {new Date(ref.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Investment:</span>
                        <span className="text-white font-semibold">
                          ${ref.investment.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Commission:</span>
                        <span className="text-emerald-400 font-bold">
                          ${ref.commission}
                        </span>
                      </div>
                    </div>
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
