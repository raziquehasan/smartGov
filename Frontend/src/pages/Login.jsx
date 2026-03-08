import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    role: 'Citizen'
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.identifier, // Backend expects email as identifier
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store mein dynamic user information save karein
        login({
          name: data.firstName,
          email: data.email,
          role: data.role || formData.role,
          token: data.token,
          profilePicture: data.profilePicture // Add this line
        });

        // Role-Based Redirection
        if (data.role === 'Officer' || data.role === 'Admin' || formData.role === 'Officer' || formData.role === 'Admin') {
          navigate('/officer-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to connect to server. Make sure backend is running.");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Branding Side */}
      <div className="hidden lg:flex w-1/2 bg-blue-900 items-center justify-center p-12 text-white text-left">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mb-6 tracking-tight">SmartGov Portal</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Securely access digital governance services. Your one-stop destination for transparency and civic engagement.
          </p>
        </div>
      </div>

      {/* Right Login Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
            <p className="text-slate-500 text-sm mt-2">Select your role to access the relevant panel.</p>
          </div>

          {/* Role Selector */}
          <div className="flex p-1 bg-slate-200 rounded-xl mb-8">
            {['Citizen', 'Officer', 'Admin'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFormData({ ...formData, role: r })}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${formData.role === r
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email or Citizen ID</label>
              <input
                required
                type="text"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter your ID"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Security Password</label>
              <input
                required
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/25"
            >
              Enter {formData.role} Dashboard
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account? <span className="text-blue-600 font-bold cursor-pointer hover:underline" onClick={() => navigate('/register')}>Create one now</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;