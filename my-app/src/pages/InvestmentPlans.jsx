import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Check, TrendingUp, Clock, DollarSign, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function InvestmentPlans() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [investmentModal, setInvestmentModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [selectedPlanData, setSelectedPlanData] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { user, createInvestment } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      id: 1,
      name: "Starter",
      minDeposit: 2,
      maxDeposit: 50,
      dailyReturn: 0.2,
      duration: 30,
      riskLevel: "Low",
      color: "from-blue-600 to-cyan-600",
      features: [
        "Daily returns up to 0.2%",
        "Flexible withdrawal",
        "24/7 support",
        "Free demo account",
      ],
    },
    {
      id: 2,
      name: "Pro",
      minDeposit: 51,
      maxDeposit: 200,
      dailyReturn: 0.35,
      duration: 60,
      riskLevel: "Medium",
      color: "from-purple-600 to-pink-600",
      features: [
        "Daily returns up to 0.35%",
        "Priority support",
        "Reinvestment option",
        "Monthly bonus rewards",
      ],
    },
    {
      id: 3,
      name: "Premium",
      minDeposit: 201,
      maxDeposit: 500,
      dailyReturn: 0.5,
      duration: 90,
      riskLevel: "High",
      color: "from-emerald-600 to-teal-600",
      features: [
        "Daily returns up to 0.5%",
        "VIP support",
        "Advanced analytics",
        "Exclusive access to new features",
      ],
    },
    {
      id: 4,
      name: "Elite",
      minDeposit: 501,
      maxDeposit: null,
      dailyReturn: 0.7,
      duration: 180,
      riskLevel: "Very High",
      color: "from-amber-600 to-orange-600",
      features: [
        "Daily returns up to 0.7%",
        "Dedicated account manager",
        "Custom investment strategy",
        "Priority ROI payouts",
      ],
    },
  ];

  const handleInvestClick = (plan) => {
    if ((user?.balance || 0) < plan.minDeposit) {
      alert(
        `Insufficient balance. You need at least $${plan.minDeposit} to invest in ${plan.name}. Current balance: $${(user?.balance || 0).toFixed(2)}`,
      );
      return;
    }
    setSelectedPlanData(plan);
    setInvestmentAmount(plan.minDeposit.toString());
    setInvestmentModal(true);
  };

  const handleConfirmInvestment = (e) => {
    e.preventDefault();
    const amount = parseFloat(investmentAmount);

    if (!investmentAmount || amount < selectedPlanData.minDeposit) {
      alert(
        `Minimum investment for ${selectedPlanData.name} is $${selectedPlanData.minDeposit}`,
      );
      return;
    }

    if (selectedPlanData.maxDeposit && amount > selectedPlanData.maxDeposit) {
      alert(
        `Maximum investment for ${selectedPlanData.name} is $${selectedPlanData.maxDeposit}`,
      );
      return;
    }

    if (amount > (user?.balance || 0)) {
      alert(
        `Insufficient balance. Available: $${(user?.balance || 0).toFixed(2)}`,
      );
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      try {
        createInvestment(amount, selectedPlanData);
        setProcessing(false);
        setInvestmentModal(false);
        setInvestmentAmount("");
        alert(
          `Investment of $${amount.toFixed(2)} created successfully! Go to Dashboard to activate it and start earning.`,
        );
        navigate("/dashboard");
      } catch (error) {
        alert(error.message);
        setProcessing(false);
      }
    }, 1500);
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
                Investment Plans
              </h1>
              <p className="text-sm sm:text-base text-slate-400 mt-2">
                Choose the perfect investment plan for your financial goals
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border rounded-2xl overflow-hidden transition transform hover:scale-105 cursor-pointer ${
                    selectedPlan === plan.id
                      ? "border-purple-500/50 ring-2 ring-purple-500/30"
                      : "border-slate-700/30 hover:border-slate-600/50"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="relative p-6">
                    {/* Badge */}
                    {plan.id === 2 && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </div>
                    )}

                    {/* Plan Header */}
                    <div className="mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <div
                        className={`w-12 h-1 bg-gradient-to-r ${plan.color} rounded-full`}
                      ></div>
                    </div>

                    {/* Key Metrics */}
                    <div className="space-y-4 mb-6">
                      {/* Daily Return */}
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <div>
                          <p className="text-slate-400 text-xs sm:text-sm">
                            Daily Return
                          </p>
                          <p className="text-white font-bold text-sm sm:text-base">
                            {plan.dailyReturn}%
                          </p>
                        </div>
                      </div>

                      {/* Min Investment */}
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <div>
                          <p className="text-slate-400 text-xs sm:text-sm">
                            Min Investment
                          </p>
                          <p className="text-white font-bold text-sm sm:text-base">
                            ${plan.minDeposit.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-400 flex-shrink-0" />
                        <div>
                          <p className="text-slate-400 text-xs sm:text-sm">
                            Duration
                          </p>
                          <p className="text-white font-bold text-sm sm:text-base">
                            {plan.duration} days
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Risk Level */}
                    <div className="mb-6">
                      <p className="text-slate-400 text-xs sm:text-sm mb-2">
                        Risk Level
                      </p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                          plan.riskLevel === "Low"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : plan.riskLevel === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : plan.riskLevel === "High"
                                ? "bg-orange-500/20 text-orange-400"
                                : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {plan.riskLevel}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6 pb-6 border-b border-slate-700/30">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-slate-300 text-xs sm:text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleInvestClick(plan)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 rounded-lg transition text-sm sm:text-base"
                    >
                      Invest Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* How It Works */}
              <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  How It Works
                </h3>
                <ol className="space-y-3 text-sm">
                  {[
                    "Choose an investment plan that fits your budget",
                    "Make an initial deposit",
                    "Start earning daily returns",
                    "Withdraw anytime with your earnings",
                  ].map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-xs">
                        {idx + 1}
                      </span>
                      <span className="text-slate-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Key Benefits */}
              <div className="bg-gradient-to-br from-emerald-600/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Key Benefits
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    "✓ No hidden fees or minimum lock-in periods",
                    "✓ Automated daily earnings calculations",
                    "✓ 24/7 withdrawal availability",
                    "✓ Professional account management",
                  ].map((benefit, idx) => (
                    <li
                      key={idx}
                      className="text-slate-300 flex items-center gap-2"
                    >
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Investment Modal */}
      {investmentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Invest in {selectedPlanData?.name}
              </h2>
              <button
                onClick={() => setInvestmentModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleConfirmInvestment} className="space-y-4">
              {/* Plan Info */}
              <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-300">Daily Return:</span>
                  <span className="text-emerald-400 font-bold">
                    {selectedPlanData?.dailyReturn}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Duration:</span>
                  <span className="text-white font-bold">
                    {selectedPlanData?.duration} days
                  </span>
                </div>
              </div>

              {/* Investment Amount */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-amber-400 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min={selectedPlanData?.minDeposit}
                    max={selectedPlanData?.maxDeposit || undefined}
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    disabled={processing}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Min: ${selectedPlanData?.minDeposit}
                  {selectedPlanData?.maxDeposit &&
                    ` | Max: $${selectedPlanData?.maxDeposit}`}
                </p>
              </div>

              {/* Current Balance */}
              <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-3">
                <p className="text-slate-300 text-sm">Current Balance</p>
                <p className="text-white font-bold text-lg">
                  ${(user?.balance || 0).toFixed(2)}
                </p>
              </div>

              {/* Estimated Earnings */}
              {investmentAmount && (
                <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-3">
                  <p className="text-slate-300 text-sm">Est. Daily Earnings</p>
                  <p className="text-emerald-400 font-bold text-lg">
                    $
                    {(
                      (parseFloat(investmentAmount) *
                        (selectedPlanData?.dailyReturn || 0)) /
                      100
                    ).toFixed(2)}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setInvestmentModal(false)}
                  disabled={processing}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
                >
                  {processing ? "Processing..." : "Confirm Investment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
