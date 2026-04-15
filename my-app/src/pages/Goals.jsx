import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Target,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function Goals() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Save $50,000",
      targetAmount: 50000,
      currentAmount: 12450.75,
      deadline: "2026-12-31",
      status: "in-progress",
      color: "from-purple-600 to-pink-600",
    },
    {
      id: 2,
      name: "Create Emergency Fund",
      targetAmount: 10000,
      currentAmount: 8500,
      deadline: "2026-06-30",
      status: "in-progress",
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: 3,
      name: "First Investment $1000",
      targetAmount: 1000,
      currentAmount: 1000,
      deadline: "2026-03-01",
      status: "completed",
      color: "from-emerald-600 to-teal-600",
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    deadline: "",
  });

  const addGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      alert("Please fill all fields");
      return;
    }

    const goal = {
      id: Math.max(...goals.map((g) => g.id), 0) + 1,
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      deadline: newGoal.deadline,
      status: "in-progress",
      color: "from-purple-600 to-pink-600",
    };

    setGoals([...goals, goal]);
    setNewGoal({ name: "", targetAmount: "", deadline: "" });
    setShowNewGoal(false);
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
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
                  Financial Goals
                </h1>
                <p className="text-sm sm:text-base text-slate-400 mt-2">
                  Set and track your investment goals
                </p>
              </div>
              <button
                onClick={() => setShowNewGoal(!showNewGoal)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition w-full sm:w-auto justify-center"
              >
                <Plus className="w-5 h-5" />
                New Goal
              </button>
            </div>

            {/* New Goal Form */}
            {showNewGoal && (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white">
                  Create New Goal
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Goal name"
                    value={newGoal.name}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, name: e.target.value })
                    }
                    className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                  />
                  <input
                    type="number"
                    placeholder="Target amount"
                    value={newGoal.targetAmount}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, targetAmount: e.target.value })
                    }
                    className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                  />
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, deadline: e.target.value })
                    }
                    className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={addGoal}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-lg transition"
                  >
                    Create Goal
                  </button>
                  <button
                    onClick={() => setShowNewGoal(false)}
                    className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Goals List */}
            <div className="space-y-4">
              {goals.length > 0 ? (
                goals.map((goal) => {
                  const progress = getProgressPercentage(
                    goal.currentAmount,
                    goal.targetAmount,
                  );
                  const daysLeft = Math.ceil(
                    (new Date(goal.deadline) - new Date()) /
                      (1000 * 60 * 60 * 24),
                  );

                  return (
                    <div
                      key={goal.id}
                      className="group relative bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden hover:border-slate-600/50 transition p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${goal.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                          >
                            <Target className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-1">
                              {goal.name}
                            </h3>
                            <p className="text-slate-400 text-sm">
                              {daysLeft > 0
                                ? `${daysLeft} days left`
                                : "Deadline passed"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-700/30 rounded-lg transition">
                            <Edit2 className="w-5 h-5 text-slate-400 hover:text-white" />
                          </button>
                          <button
                            onClick={() => deleteGoal(goal.id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition"
                          >
                            <Trash2 className="w-5 h-5 text-slate-400 hover:text-red-400" />
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-white font-semibold text-sm">
                                $
                                {goal.currentAmount.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </p>
                              <p className="text-slate-400 text-xs">
                                of ${goal.targetAmount.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <span className="text-white font-bold text-lg">
                            {Math.round(progress)}%
                          </span>
                        </div>

                        <div className="w-full bg-slate-700/30 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${goal.color} transition-all duration-300`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        {goal.status === "completed" ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400 text-sm font-semibold">
                              Goal Achieved!
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-400 text-sm font-semibold">
                              In Progress
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <Target className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">
                    No goals yet. Create your first goal!
                  </p>
                  <button
                    onClick={() => setShowNewGoal(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Create Goal
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
