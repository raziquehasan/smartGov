import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate

  const serviceCategories = [
    { id: "identity", name: "Identity & Civil", icon: "🆔", count: 12 },
    { id: "health", name: "Public Health", icon: "🏥", count: 8 },
    { id: "education", name: "Education", icon: "🎓", count: 15 },
    { id: "tax", name: "Business & Tax", icon: "💼", count: 10 },
    { id: "transport", name: "Transport", icon: "🚗", count: 6 },
    { id: "social", name: "Social Welfare", icon: "🤝", count: 9 },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Digital Governance for a Modern Nation
          </h1>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Access hundreds of government services, track your applications, and connect with your local administration in just a few clicks.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Search for services (e.g., Passport, License, Taxes)..." 
              className="w-full pl-6 pr-16 py-4 rounded-full text-slate-900 text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 p-2.5 rounded-full hover:bg-blue-700 transition">
              🔍
            </button>
          </div>
        </div>
      </section>

      {/* Quick Service Grid */}
      <section className="max-w-7xl mx-auto -mt-16 px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {serviceCategories.map((cat, i) => (
            <div 
              key={i} 
              // Added onClick to handle navigation dynamically
              onClick={() => navigate(`/services/${cat.id}`)}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border border-slate-100 text-center cursor-pointer group"
            >
              <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{cat.name}</h3>
              <p className="text-blue-600 text-xs mt-1 font-medium">{cat.count} Services</p>
            </div>
          ))}
        </div>

        {/* Announcements Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Updates</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-4 mb-6">Latest Government Initiatives</h2>
            <div className="space-y-4">
              {[1, 2, 3].map(n => (
                <div key={n} className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition group">
                  <div className="w-24 h-24 bg-slate-200 rounded-lg shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-400">Image</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition">Digital Literacy Campaign 2026 Launches Nationwide</h4>
                    <p className="text-sm text-slate-500 mt-1">Expanding access to technology for rural communities...</p>
                    <span className="text-xs text-slate-400 mt-2 block">Feb 12, 2026</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl">🏛️</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Official Notices</h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3 border-b border-slate-50 pb-4 italic text-slate-600">
                  "New policy updates regarding municipal tax exemptions for small businesses effective from March."
                </li>
                <li className="flex items-start gap-3 border-b border-slate-50 pb-4 italic text-slate-600">
                  "Public consultation on urban transport planning scheduled for next Monday via SmartGov portal."
                </li>
              </ul>
              <button className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800">Explore Portal News</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;