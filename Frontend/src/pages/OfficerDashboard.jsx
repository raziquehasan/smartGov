import React from 'react';
import { useIssueStore } from '../store/IssueStore';
import { useUIStore } from '../store/UIStore';

const OfficerDashboard = () => {
  const { issues, updateIssueStatus } = useIssueStore();
  const showToast = useUIStore((state) => state.showToast);

  const handleAction = (id, action) => {
    const finalStatus = action === 'Approve' ? 'In Progress' : 'Rejected';
    updateIssueStatus(id, finalStatus); // Status update in store
    showToast(`Ticket ${id} marked as ${finalStatus}`, action === 'Approve' ? 'success' : 'error');
  };

  // Stats calculation
  const pendingCount = issues.filter(i => i.status === 'Pending').length;
  const resolvedCount = issues.filter(i => i.status === 'In Progress').length;

  return (
    <div className="bg-slate-50 min-h-screen p-8 text-left font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Municipal Officer Console</h1>
          <p className="text-slate-500 font-medium mt-1">Grievance Redressal Management System</p>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Active Tickets</span>
            <p className="text-4xl font-black text-slate-900 mt-2">{pendingCount}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">In Progress</span>
            <p className="text-4xl font-black text-slate-900 mt-2">{resolvedCount}</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/30">
            <h3 className="font-bold text-slate-800">Incoming Grievances Queue</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-tighter">
                <tr>
                  <th className="px-8 py-4">ID</th>
                  <th className="px-8 py-4">Citizen</th>
                  <th className="px-8 py-4">Issue</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {issues.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 font-mono text-sm text-blue-600">{item.id}</td>
                    <td className="px-8 py-5 font-bold text-slate-800">{item.citizen}</td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-semibold text-slate-700">{item.category}</p>
                      <p className="text-xs text-slate-400 truncate max-w-xs">{item.issue}</p>
                    </td>
                    <td className="px-8 py-5 text-slate-500 text-sm">{item.date}</td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                        item.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                        item.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      {item.status === 'Pending' ? (
                        <div className="flex gap-2 justify-center">
                          <button onClick={() => handleAction(item.id, 'Approve')} className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-600 transition">Approve</button>
                          <button onClick={() => handleAction(item.id, 'Reject')} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-50 hover:text-red-600 transition">Reject</button>
                        </div>
                      ) : (
                        <p className="text-center text-xs text-slate-400 font-medium italic">Action Taken</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;