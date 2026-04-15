import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Lock,
  Shield,
  Smartphone,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function SecuritySettings() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      alert("Password changed successfully!");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 max-w-4xl">
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Security Settings
              </h1>
              <p className="text-slate-400">
                Protect your account and manage security options
              </p>
            </div>

            {/* Password Section */}
            <div className="group relative bg-gradient-to-br from-blue-600/10 via-blue-600/5 to-slate-900/50 backdrop-blur-xl border border-blue-500/30 rounded-3xl overflow-hidden">
              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Change Password
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Update your password regularly to keep your account secure
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* New Password */}
                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-slate-700/20 border border-slate-600/30 rounded-lg p-4">
                    <p className="text-slate-300 text-sm font-semibold mb-3">
                      Password Requirements:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li
                        className={`flex items-center gap-2 ${newPassword.length >= 6 ? "text-emerald-400" : "text-slate-400"}`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        At least 6 characters
                      </li>
                      <li
                        className={`flex items-center gap-2 ${newPassword === confirmPassword && newPassword ? "text-emerald-400" : "text-slate-400"}`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Passwords match
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={handleChangePassword}
                    disabled={
                      !newPassword ||
                      newPassword !== confirmPassword ||
                      newPassword.length < 6
                    }
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="group relative bg-gradient-to-br from-purple-600/10 via-purple-600/5 to-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl overflow-hidden">
              <div className="relative p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-semibold text-sm">
                    ✓ Enabled
                  </div>
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="group relative bg-gradient-to-br from-orange-600/10 via-orange-600/5 to-slate-900/50 backdrop-blur-xl border border-orange-500/30 rounded-3xl overflow-hidden">
              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Active Sessions
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Manage your active login sessions
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Current Session */}
                  <div className="bg-slate-700/30 border border-emerald-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                        <div>
                          <p className="text-white font-semibold">
                            Chrome on Windows
                          </p>
                          <p className="text-slate-400 text-sm">
                            Current session • 192.168.1.1
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Other Sessions */}
                  <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold">
                          Safari on iPhone
                        </p>
                        <p className="text-slate-400 text-sm">
                          Last 2 hours ago • 192.168.1.2
                        </p>
                      </div>
                      <button className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg hover:bg-red-500/30 transition">
                        Sign Out
                      </button>
                    </div>
                  </div>

                  {/* Sign Out All */}
                  <button className="w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white font-semibold rounded-lg transition border border-slate-600/50 hover:border-slate-500/50">
                    Sign Out All Other Sessions
                  </button>
                </div>
              </div>
            </div>

            {/* Login History */}
            <div className="group relative bg-gradient-to-br from-cyan-600/10 via-cyan-600/5 to-slate-900/50 backdrop-blur-xl border border-cyan-500/30 rounded-3xl overflow-hidden">
              <div className="relative p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Recent Login History
                </h3>

                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {[
                    {
                      device: "Chrome (Windows)",
                      ip: "192.168.1.1",
                      time: "2 hours ago",
                      status: "Success",
                    },
                    {
                      device: "Safari (iPhone)",
                      ip: "192.168.1.2",
                      time: "1 day ago",
                      status: "Success",
                    },
                    {
                      device: "Chrome (Windows)",
                      ip: "192.168.1.3",
                      time: "3 days ago",
                      status: "Success",
                    },
                  ].map((login, i) => (
                    <div
                      key={i}
                      className="bg-slate-700/20 border border-slate-600/30 rounded-lg p-4 hover:bg-slate-700/30 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">
                            {login.device}
                          </p>
                          <p className="text-slate-400 text-sm">
                            IP: {login.ip} • {login.time}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
                          {login.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
