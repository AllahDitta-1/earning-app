import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Download,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

export default function Transactions() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const transactions = [
    {
      id: 1,
      type: "deposit",
      description: "Deposit via Bank Transfer",
      amount: 5000,
      date: "2026-03-13",
      status: "completed",
    },
    {
      id: 2,
      type: "withdrawal",
      description: "Withdrawal to Bank Account",
      amount: 2000,
      date: "2026-03-12",
      status: "completed",
    },
    {
      id: 3,
      type: "earning",
      description: "Investment Profit",
      amount: 450.75,
      date: "2026-03-11",
      status: "completed",
    },
    {
      id: 4,
      type: "referral",
      description: "Referral Commission",
      amount: 150,
      date: "2026-03-10",
      status: "completed",
    },
    {
      id: 5,
      type: "deposit",
      description: "Deposit via Credit Card",
      amount: 1000,
      date: "2026-03-09",
      status: "completed",
    },
    {
      id: 6,
      type: "withdrawal",
      description: "Withdrawal Request",
      amount: 500,
      date: "2026-03-08",
      status: "pending",
    },
    {
      id: 7,
      type: "earning",
      description: "Daily Earnings",
      amount: 125.5,
      date: "2026-03-07",
      status: "completed",
    },
    {
      id: 8,
      type: "investment",
      description: "Investment Payment",
      amount: 2500,
      date: "2026-03-06",
      status: "completed",
    },
  ];

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.amount.toString().includes(searchQuery);
    const matchesType = filterType === "all" || tx.type === filterType;
    const matchesStatus = filterStatus === "all" || tx.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeColor = (type) => {
    const colors = {
      deposit: "from-blue-500 to-cyan-500",
      withdrawal: "from-orange-500 to-red-500",
      earning: "from-emerald-500 to-teal-500",
      referral: "from-purple-500 to-pink-500",
      investment: "from-amber-500 to-orange-500",
    };
    return colors[type] || "from-slate-500 to-slate-600";
  };

  const getTypeIcon = (type) => {
    return type === "deposit" ||
      type === "earning" ||
      type === "referral" ||
      type === "investment" ? (
      <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
    ) : (
      <ArrowUpRight className="w-5 h-5 text-red-400" />
    );
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Transactions
                </h1>
                <p className="text-sm sm:text-base text-slate-400">
                  View all your transaction history
                </p>
              </div>
              <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition w-full sm:w-auto justify-center">
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Search */}
              <div className="sm:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                />
              </div>

              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="earning">Earnings</option>
                <option value="referral">Referrals</option>
                <option value="investment">Investments</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Transactions Table */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden">
              {/* Desktop View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50 border-b border-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Type
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((tx) => (
                        <tr
                          key={tx.id}
                          className="hover:bg-slate-700/20 transition"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 bg-gradient-to-br ${getTypeColor(
                                  tx.type,
                                )} rounded-lg flex items-center justify-center flex-shrink-0`}
                              >
                                {getTypeIcon(tx.type)}
                              </div>
                              <span className="text-white font-medium text-sm">
                                {tx.description}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-400 text-sm capitalize">
                              {tx.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              className={`font-semibold text-sm ${
                                tx.type === "withdrawal"
                                  ? "text-red-400"
                                  : "text-emerald-400"
                              }`}
                            >
                              {tx.type === "withdrawal" ? "-" : "+"}$
                              {tx.amount.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-400 text-sm">
                              {new Date(tx.date).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                tx.status === "completed"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-amber-500/20 text-amber-400"
                              }`}
                            >
                              {tx.status.charAt(0).toUpperCase() +
                                tx.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <p className="text-slate-400">
                            No transactions found
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="sm:hidden space-y-3 p-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="bg-slate-700/20 border border-slate-600/30 rounded-lg p-4 hover:border-slate-500/50 transition"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 bg-gradient-to-br ${getTypeColor(
                              tx.type,
                            )} rounded-lg flex items-center justify-center flex-shrink-0`}
                          >
                            {getTypeIcon(tx.type)}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">
                              {tx.description}
                            </p>
                            <p className="text-slate-400 text-xs">
                              {new Date(tx.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`font-bold text-sm whitespace-nowrap ml-2 ${
                            tx.type === "withdrawal"
                              ? "text-red-400"
                              : "text-emerald-400"
                          }`}
                        >
                          {tx.type === "withdrawal" ? "-" : "+"}$
                          {tx.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-xs capitalize">
                          {tx.type}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            tx.status === "completed"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}
                        >
                          {tx.status.charAt(0).toUpperCase() +
                            tx.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-8">
                    No transactions found
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
