import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import StatsCard from "../components/StatsCard";
import LiveEarning from "../components/LiveEarning";
import QuickActions from "../components/QuickActions";
import InvestmentOverview from "../components/InvestmentOverview";
import ChartSection from "../components/ChartSection";
import RecentActivity from "../components/RecentActivity";
import { useAuth } from "../context/AuthContext";
import {
  TrendingUp,
  Users,
  Gift,
  DollarSign,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-slate-400">
                Welcome back! Here's your earning overview
              </p>
            </div>

            {/* Balance Card */}
            <BalanceCard />

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                icon={<DollarSign className="w-6 h-6" />}
                label="Total Invested"
                value={`$${(user?.totalInvested || 0).toFixed(2)}`}
                color="from-orange-500 to-orange-600"
              />
              <StatsCard
                icon={<Gift className="w-6 h-6" />}
                label="Referral Earning"
                value={`$${(user?.referralEarning || 0).toFixed(2)}`}
                color="from-purple-500 to-purple-600"
              />
              <StatsCard
                icon={<ArrowUp className="w-6 h-6" />}
                label="Total Deposit"
                value={`$${(user?.totalDeposit || 0).toFixed(2)}`}
                color="from-yellow-500 to-yellow-600"
              />
              <StatsCard
                icon={<ArrowDown className="w-6 h-6" />}
                label="Total Withdrawn"
                value={`$${(user?.totalWithdrawn || 0).toFixed(2)}`}
                color="from-red-500 to-red-600"
              />
            </div>

            {/* Live Earning & WhatsApp */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <LiveEarning />
              </div>
              <div>
                <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 border border-emerald-500/20 rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-4">📱</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Join WhatsApp Community
                  </h3>
                  <p className="text-slate-300 text-sm mb-6">
                    Get real-time updates and exclusive tips
                  </p>
                  <button
                    onClick={() =>
                      window.open("https://chat.whatsapp.com/", "_blank")
                    }
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.806c0 2.734.732 5.41 2.125 7.758L2.89 21.476l8.076-2.119c2.211 1.202 4.699 1.84 7.281 1.84 5.364 0 9.796-4.375 9.823-9.79 0-2.622-.675-5.08-1.955-7.263-1.281-2.183-3.087-4.132-5.321-5.428-2.234-1.295-4.798-2.008-7.432-2.008z" />
                    </svg>
                    Join WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <ChartSection />

            {/* Investment Overview & Rank */}
            <InvestmentOverview />

            {/* Recent Activity */}
            <RecentActivity />

            {/* Quick Actions */}
            <QuickActions />
          </div>
        </main>
      </div>
    </div>
  );
}
