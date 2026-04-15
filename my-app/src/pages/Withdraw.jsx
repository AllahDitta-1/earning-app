import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Send,
  Check,
  Clock,
  AlertCircle,
  Copy,
  Building2,
  Coins,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PaymentMethodIcons } from "../components/PaymentMethodIcons";

// Use styled payment icons
const WithdrawLogos = PaymentMethodIcons;

export default function Withdraw() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [withdrawMethod, setWithdrawMethod] = useState("bank");
  const [amount, setAmount] = useState("");
  const [bankAccount, setBankAccount] = useState({
    accountHolder: "John Doe",
    accountNumber: "****1234",
    bankName: "Chase Bank",
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, withdrawFunds } = useAuth();
  const navigate = useNavigate();

  const handleWithdraw = (e) => {
    e.preventDefault();
    alert(
      "Withdrawal feature is currently disabled. Please contact admin support.",
    );
    return;
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 max-w-2xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Withdraw Funds
              </h1>
              <p className="text-sm sm:text-base text-amber-400 mt-2">
                ⚠️ Withdrawal feature is currently disabled. Please contact
                admin support.
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-6 bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-4 flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-emerald-400 font-semibold">
                    Withdrawal Requested!
                  </p>
                  <p className="text-emerald-300 text-sm">
                    Your funds will be transferred within 2-3 business days.
                  </p>
                </div>
              </div>
            )}

            {/* Available Balance */}
            <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/10 border border-emerald-500/30 rounded-lg p-4 sm:p-6 mb-8">
              <p className="text-slate-400 text-sm mb-2">Available Balance</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                ${(user?.balance || 0).toFixed(2)}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-2">
                You can withdraw up to this amount
              </p>
            </div>

            {/* Withdrawal Methods */}
            <div className="space-y-3 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">
                Select Withdrawal Method
              </h3>

              {/* Bank Transfer */}
              <button
                onClick={() => setWithdrawMethod("bank")}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition ${
                  withdrawMethod === "bank"
                    ? "bg-gradient-to-br from-purple-600/20 to-pink-600/10 border-purple-500/50"
                    : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50"
                }`}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-lg flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-500 text-white">
                  {WithdrawLogos.bank}
                </div>
                <div className="text-left flex-1">
                  <p className="text-white font-semibold">Bank Transfer</p>
                  <p className="text-slate-400 text-sm">
                    Direct transfer to your bank account
                  </p>
                </div>
                {withdrawMethod === "bank" && (
                  <div className="w-6 h-6 rounded-full border-2 border-purple-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                )}
              </button>

              {/* JazzCash */}
              <button
                onClick={() => setWithdrawMethod("jazzcash")}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition ${
                  withdrawMethod === "jazzcash"
                    ? "bg-gradient-to-br from-purple-600/20 to-pink-600/10 border-purple-500/50"
                    : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50"
                }`}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-lg flex-shrink-0 bg-gradient-to-br from-red-600 to-yellow-500 text-white">
                  {WithdrawLogos.jazzcash}
                </div>
                <div className="text-left flex-1">
                  <p className="text-white font-semibold">JazzCash</p>
                  <p className="text-slate-400 text-sm">
                    Send money via JazzCash mobile wallet
                  </p>
                </div>
                {withdrawMethod === "jazzcash" && (
                  <div className="w-6 h-6 rounded-full border-2 border-purple-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                )}
              </button>

              {/* Crypto */}
              <button
                onClick={() => setWithdrawMethod("crypto")}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition ${
                  withdrawMethod === "crypto"
                    ? "bg-gradient-to-br from-purple-600/20 to-pink-600/10 border-purple-500/50"
                    : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50"
                }`}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-lg flex-shrink-0 bg-gradient-to-br from-yellow-600 to-yellow-500 text-white">
                  {WithdrawLogos.crypto}
                </div>
                <div className="text-left flex-1">
                  <p className="text-white font-semibold">Cryptocurrency</p>
                  <p className="text-slate-400 text-sm">
                    Bitcoin, Ethereum, USDT, and more
                  </p>
                </div>
                {withdrawMethod === "crypto" && (
                  <div className="w-6 h-6 rounded-full border-2 border-purple-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                )}
              </button>
            </div>

            {/* Withdrawal Form */}
            <form onSubmit={handleWithdraw} className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-3">
                <label className="block text-white font-semibold">
                  Withdraw Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    min="50"
                    max={user?.balance || 0}
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter withdrawal amount"
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-8 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                disabled={true}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition"
              >
                Continue Withdraw
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
