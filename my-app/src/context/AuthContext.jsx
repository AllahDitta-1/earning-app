import { createContext, useState, useContext, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";

const AuthContext = createContext(null);

// API Base URL - Change this to your backend URL

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);

      // Optionally verify token with backend
      verifyTokenWithBackend(storedToken);
    }
    setLoading(false);
  }, []);

  const verifyTokenWithBackend = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  };

  const calculateLiveEarning = (investments) => {
    return investments.reduce((total, inv) => {
      const daysActive = Math.floor(
        (Date.now() - inv.startDate) / (1000 * 60 * 60 * 24),
      );
      const dailyEarning = (inv.amount * inv.dailyReturn) / 100;
      return total + dailyEarning * daysActive;
    }, 0);
  };

  const signup = async (email, password, name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      const { user: userData, token: newToken } = data.data;

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);

      return userData;
    } catch (error) {
      throw new Error(error.message || "Signup failed");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const { user: userData, token: newToken } = data.data;

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);

      return userData;
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
  };

  const updateUserBalance = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Add funds (deposit)
  const addFunds = async (amount) => {
    try {
      const response = await fetch(`${API_BASE_URL}/funds/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          paymentMethod: "card", // Default method
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add funds");
      }

      const newBalance = data.data.balance;
      const updatedUser = { ...user, balance: newBalance };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      throw new Error(error.message || "Failed to add funds");
    }
  };

  // Withdraw funds
  const withdrawFunds = async (amount, withdrawMethod = "bank") => {
    try {
      const response = await fetch(`${API_BASE_URL}/funds/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          withdrawMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to withdraw funds");
      }

      // Update local balance
      const updatedUser = {
        ...user,
        balance: user.balance - amount,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      return data.data;
    } catch (error) {
      throw new Error(error.message || "Failed to withdraw funds");
    }
  };

  // Create new investment
  const createInvestment = (amount, plan) => {
    if (amount > user.balance) {
      throw new Error("Insufficient balance");
    }

    const newInvestment = {
      id: Date.now(),
      amount,
      plan: plan.name,
      dailyReturn: plan.dailyReturn,
      duration: plan.duration,
      startDate: null, // Set when activated
      earned: 0,
      status: "inactive", // Must be activated to start earning
    };

    const updatedUser = {
      ...user,
      balance: user.balance - amount,
      totalInvested: (user.totalInvested || 0) + amount,
      investments: [...(user.investments || []), newInvestment],
      transactions: [
        ...(user.transactions || []),
        {
          id: Date.now(),
          type: "investment",
          description: `Investment in ${plan.name} plan`,
          amount,
          date: new Date().toISOString(),
          status: "completed",
        },
      ],
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    return newInvestment;
  };

  // Activate investment to start earning
  const activateInvestment = (investmentId) => {
    const investment = user.investments.find((inv) => inv.id === investmentId);
    if (!investment) throw new Error("Investment not found");
    if (investment.status === "active")
      throw new Error("Investment already active");

    const updatedInvestments = user.investments.map((inv) =>
      inv.id === investmentId
        ? { ...inv, status: "active", startDate: Date.now() }
        : inv,
    );

    const updatedUser = {
      ...user,
      investments: updatedInvestments,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Claim earnings from investment
  const claimEarnings = (investmentId) => {
    const investment = user.investments.find((inv) => inv.id === investmentId);
    if (!investment) throw new Error("Investment not found");

    const daysActive = Math.floor(
      (Date.now() - investment.startDate) / (1000 * 60 * 60 * 24),
    );
    const totalEarned =
      (investment.amount * investment.dailyReturn * daysActive) / 100;

    const updatedInvestments = user.investments.map((inv) =>
      inv.id === investmentId ? { ...inv, earned: 0 } : inv,
    );

    const updatedUser = {
      ...user,
      balance: user.balance + totalEarned,
      investments: updatedInvestments,
      transactions: [
        ...(user.transactions || []),
        {
          id: Date.now(),
          type: "earning",
          description: `Claimed earnings from ${investment.plan} plan`,
          amount: totalEarned,
          date: new Date().toISOString(),
          status: "completed",
        },
      ],
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        signup,
        login,
        logout,
        updateUserBalance,
        addFunds,
        withdrawFunds,
        createInvestment,
        activateInvestment,
        claimEarnings,
        calculateLiveEarning,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
