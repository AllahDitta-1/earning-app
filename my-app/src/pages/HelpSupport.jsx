import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

export default function HelpSupport() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I make my first investment?",
      answer:
        "To make your first investment, go to the Dashboard and click 'Start Investment'. Choose a plan that suits your goals and deposit the minimum amount required.",
    },
    {
      question: "What is the minimum deposit amount?",
      answer:
        "The minimum deposit amount varies by plan. Most plans require a minimum of $100. You can see the specific amount when you select a plan.",
    },
    {
      question: "How are earnings calculated?",
      answer:
        "Earnings are calculated based on your investment amount, the plan you choose, and the duration of your investment. Real-time earnings are displayed on your dashboard.",
    },
    {
      question: "Can I withdraw my funds anytime?",
      answer:
        "Yes, you can withdraw your funds anytime from the Dashboard. However, some plans may have lock-in periods. Check your plan details before withdrawing.",
    },
    {
      question: "How do referrals work?",
      answer:
        "When you refer a friend using your referral link, you'll earn a commission from their investments. The more friends you refer, the more you earn!",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bank transfers, credit/debit cards, and multiple cryptocurrency options. Choose the method that's most convenient for you.",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
                Help & Support
              </h1>
              <p className="text-slate-400">
                Get answers to your questions and contact our support team
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Email Support */}
              <div className="group relative bg-gradient-to-br from-blue-600/10 via-blue-600/5 to-slate-900/50 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/50 transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Email Support
                    </h3>
                    <p className="text-slate-400 text-sm">24/7 response</p>
                  </div>
                </div>
                <p className="text-blue-300 font-semibold mb-3">
                  support@earnhub.com
                </p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition text-sm">
                  Send Email
                </button>
              </div>

              {/* Live Chat */}
              <div className="group relative bg-gradient-to-br from-purple-600/10 via-purple-600/5 to-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/50 transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center relative">
                    <MessageSquare className="w-6 h-6 text-white" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Live Chat</h3>
                    <p className="text-emerald-400 text-sm">Online now</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mb-3">
                  Chat with our support team in real-time
                </p>
                <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 rounded-lg transition text-sm">
                  Start Chat
                </button>
              </div>

              {/* Phone Support */}
              <div className="group relative bg-gradient-to-br from-emerald-600/10 via-emerald-600/5 to-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 hover:border-emerald-500/50 transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Phone Support
                    </h3>
                    <p className="text-slate-400 text-sm">Mon-Fri, 9AM-6PM</p>
                  </div>
                </div>
                <p className="text-emerald-300 font-semibold mb-3">
                  +1 (555) 123-7890
                </p>
                <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-2 rounded-lg transition text-sm">
                  Call Now
                </button>
              </div>

              {/* Response Time */}
              <div className="group relative bg-gradient-to-br from-orange-600/10 via-orange-600/5 to-slate-900/50 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6 hover:border-orange-500/50 transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Avg. Response
                    </h3>
                    <p className="text-slate-400 text-sm">Our commitment</p>
                  </div>
                </div>
                <p className="text-orange-300 font-semibold mb-2">15 Minutes</p>
                <p className="text-slate-400 text-sm">
                  We respond to all inquiries within 15 minutes
                </p>
              </div>
            </div>

            {/* FAQs Section */}
            <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden">
              <div className="relative p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-cyan-400" />
                  Frequently Asked Questions
                </h3>

                {/* Search FAQs */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                  />
                </div>

                {/* FAQ Items */}
                <div className="space-y-3">
                  {filteredFAQs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-slate-700/20 border border-slate-600/30 rounded-lg overflow-hidden hover:border-slate-500/50 transition"
                    >
                      <button
                        onClick={() =>
                          setExpandedFAQ(expandedFAQ === index ? null : index)
                        }
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition text-left"
                      >
                        <p className="text-white font-semibold pr-4">
                          {faq.question}
                        </p>
                        {expandedFAQ === index ? (
                          <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                      {expandedFAQ === index && (
                        <div className="px-6 py-4 bg-slate-700/10 border-t border-slate-600/30">
                          <p className="text-slate-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-400">
                      No FAQs found matching your search.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Ticket System */}
            <div className="group relative bg-gradient-to-br from-rose-600/10 via-rose-600/5 to-slate-900/50 backdrop-blur-xl border border-rose-500/30 rounded-3xl overflow-hidden">
              <div className="relative p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Submit a Support Ticket
                </h3>
                <p className="text-slate-400 mb-6">
                  Can't find the answer? Submit a ticket and our team will get
                  back to you shortly.
                </p>
                <button className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-semibold py-3 rounded-lg transition">
                  Create New Ticket
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
