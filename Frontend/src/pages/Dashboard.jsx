import React, { useState } from 'react';
import { useAuthStore } from '../store/AuthStore';
import { useIssueStore } from '../store/IssueStore'; // 1. Hook for real issues
import ReportModal from '../components/ReportModal';
import PaymentModal from '../components/PaymentModal'; // 2. Add Payment Modal

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const issues = useIssueStore((state) => state.issues); // 3. Get issues from store
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false); // 4. Pay Modal State

  // Filter issues for the current user
  const userIssues = issues.filter(i => i.citizen === user?.name || i.citizen === "Sadiya Shaikh");

  const stats = [
    { label: "Active Applications", value: "03", color: "blue" },
    { label: "Pending Bills", value: "$420.00", color: "amber" },
    { label: "Reports Filed", value: userIssues.length.toString().padStart(2, '0'), color: "emerald" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-6 lg:p-12 text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome, {user?.name || 'Citizen'}
            </h1>
            <p className="text-slate-500 font-medium">
              Monitoring your public status as of {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-slate-200 px-5 py-2.5 rounded-xl font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition">
              Download Reports
            </button>
            <button className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-red-500/20 hover:bg-red-700 transition">
              🚨 Report Emergency
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
              <span className={`text-${s.color}-600 font-bold text-xs uppercase tracking-widest`}>{s.label}</span>
              <div className="flex items-end gap-2 mt-2">
                <p className="text-4xl font-black text-slate-900">{s.value}</p>
                {s.label === "Pending Bills" && (
                  <button 
                    onClick={() => setIsPayModalOpen(true)}
                    className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-md mb-1 font-bold hover:bg-amber-600 hover:text-white transition"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content: Tracking Issue Reports */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-lg">My Grievance Reports</h3>
              <span className="text-xs font-bold text-slate-400 uppercase">Live Status</span>
            </div>
            <div className="p-0">
              {userIssues.length > 0 ? (
                userIssues.map((item, i) => (
                  <div key={i} className="p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-slate-900">{item.category}</h4>
                        <p className="text-xs text-slate-400 font-mono mt-1">{item.id}</p>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                        item.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                        item.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    {/* Dynamic Progress Bar based on status */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          item.status === 'Pending' ? 'bg-amber-400 w-1/3' : 
                          item.status === 'Rejected' ? 'bg-red-400 w-full' : 'bg-emerald-500 w-full'
                        }`}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center text-slate-400 italic">No reports filed yet.</div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
              <div className="absolute -right-6 -bottom-6 text-9xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500 pointer-events-none">✍️</div>
              <h3 className="text-xl font-bold mb-2">Report an Issue</h3>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Spotted a pothole or broken streetlight? Help your local administration fix it.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-indigo-700 px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transition relative z-10 active:scale-95"
              >
                Create Ticket
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6">Recent Notifications</h3>
              <div className="space-y-5">
                {[
                  { title: "Report #TKT-101 Updated", time: "Just now", icon: "🔔" },
                  { title: "Bill Payment Successful", time: "2h ago", icon: "✅" },
                  { title: "Policy Change Alert", time: "3d ago", icon: "📅" },
                ].map((n, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-xl">{n.icon}</span>
                    <div className="text-left">
                      <p className="text-sm font-bold text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-400">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <PaymentModal 
        isOpen={isPayModalOpen} 
        onClose={() => setIsPayModalOpen(false)}
        billAmount="$420.00"
        billType="Water & Property Tax"
      />
    </div>
  );
};

export default Dashboard;