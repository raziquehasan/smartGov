import React from 'react';
import { useIssueStore } from '../store/IssueStore';

const AdminDashboard = () => {
  const { issues } = useIssueStore();

  // Analytics Calculation
  const totalRevenue = "$1.2M"; 
  const activeUsers = "45,200";
  const resolutionRate = "88%";

  const departmentData = [
    { dept: "Electricity", load: "75%", status: "Stable" },
    { dept: "Water Supply", load: "92%", status: "Critical" },
    { dept: "Waste Mgmt", load: "60%", status: "Optimal" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-8 text-left font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">City Command Center</h1>
            <p className="text-slate-500 font-medium">Strategic Analytics & Infrastructure Oversight</p>
          </div>
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-bold text-xs uppercase">
            Admin Access: Level 1
          </div>
        </header>

        {/* Global Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total Revenue Collected</span>
            <p className="text-4xl font-black text-blue-600 mt-2">{totalRevenue}</p>
            <p className="text-emerald-500 text-xs font-bold mt-2">↑ 12% from last month</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Active Citizen Profiles</span>
            <p className="text-4xl font-black text-slate-900 mt-2">{activeUsers}</p>
            <p className="text-slate-400 text-xs font-medium mt-2">Verified via National ID</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Issue Resolution Rate</span>
            <p className="text-4xl font-black text-emerald-500 mt-2">{resolutionRate}</p>
            <p className="text-slate-400 text-xs font-medium mt-2">Based on {issues.length} total reports</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Department Performance */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
            <h3 className="font-bold text-slate-800 mb-6">Department Resource Load</h3>
            <div className="space-y-6">
              {departmentData.map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-slate-700">{d.dept}</span>
                    <span className={`text-xs font-black ${d.status === 'Critical' ? 'text-red-500' : 'text-emerald-500'}`}>{d.status}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${d.status === 'Critical' ? 'bg-red-500' : 'bg-blue-500'}`} 
                      style={{ width: d.load }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent City-Wide Activity */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50">
              <h3 className="font-bold text-slate-800 text-left">Live System Logs</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {issues.slice(0, 4).map((item, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                      {item.category === 'Street Lights' ? '💡' : '🛣️'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{item.issue}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{item.citizen}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-black">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;