import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function MyProfile() {
  const { user, updateUserBalance } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    country: "United States",
    city: "New York",
    joinedDate: "January 15, 2024",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateUserBalance({
      name: formData.name,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 max-w-4xl">
            {/* Page Title */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  My Profile
                </h1>
                <p className="text-slate-400">
                  Manage your account information
                </p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition"
              >
                <Edit2 className="w-4 h-4" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {/* Profile Avatar & Basic Info */}
            <div className="group relative bg-gradient-to-br from-purple-600/10 via-purple-600/5 to-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl overflow-hidden">
              <div className="relative p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-5xl font-bold text-white border-4 border-purple-400/50">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition">
                        📷
                      </button>
                    )}
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {formData.name}
                    </h2>
                    <p className="text-slate-400 mb-4">{formData.email}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
                        ✓ Verified Account
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full">
                        🔒 2FA Enabled
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Name */}
                <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition">
                  <label className="block text-slate-300 text-sm font-semibold mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-400" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                    />
                  ) : (
                    <p className="text-white text-lg font-medium">
                      {formData.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition">
                  <label className="block text-slate-300 text-sm font-semibold mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    Email Address
                  </label>
                  <p className="text-white text-lg font-medium">
                    {formData.email}
                  </p>
                  <p className="text-slate-500 text-xs mt-2">
                    Cannot change email address
                  </p>
                </div>

                {/* Phone */}
                <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition">
                  <label className="block text-slate-300 text-sm font-semibold mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                    />
                  ) : (
                    <p className="text-white text-lg font-medium">
                      {formData.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Country */}
                <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition">
                  <label className="block text-slate-300 text-sm font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    Country
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                    />
                  ) : (
                    <p className="text-white text-lg font-medium">
                      {formData.country}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition">
                  <label className="block text-slate-300 text-sm font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                    />
                  ) : (
                    <p className="text-white text-lg font-medium">
                      {formData.city}
                    </p>
                  )}
                </div>

                {/* Joined Date */}
                <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition">
                  <label className="block text-slate-300 text-sm font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    Member Since
                  </label>
                  <p className="text-white text-lg font-medium">
                    {formData.joinedDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
