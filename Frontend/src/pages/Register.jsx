import React, { useState } from 'react';

const Register = () => {
  // State for form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dob, setDob] = useState('');           // UI only
  const [nationalId, setNationalId] = useState(''); // UI only
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [state, setState] = useState('');       // new state field

  // UI states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // List of states (must match backend enum exactly)
  // Replace these with your actual enum values
  const stateOptions = [
    'ANDHRA_PRADESH',
    'ARUNACHAL_PRADESH',
    'ASSAM',
    'BIHAR',
    'CHHATTISGARH',
    'GOA',
    'GUJARAT',
    'HARYANA',
    'HIMACHAL_PRADESH',
    'JHARKHAND',
    'KARNATAKA',
    'KERALA',
    'MADHYA_PRADESH',
    'MAHARASHTRA',
    'MANIPUR',
    'MEGHALAYA',
    'MIZORAM',
    'NAGALAND',
    'ODISHA',
    'PUNJAB',
    'RAJASTHAN',
    'SIKKIM',
    'TAMIL_NADU',
    'TELANGANA',
    'TRIPURA',
    'UTTAR_PRADESH',
    'UTTARAKHAND',
    'WEST_BENGAL',
    'ANDAMAN_AND_NICOBAR_ISLANDS',
    'CHANDIGARH',
    'DADRA_AND_NAGAR_HAVELI_AND_DAMAN_AND_DIU',
    'DELHI',
    'JAMMU_AND_KASHMIR',
    'LADAKH',
    'LAKSHADWEEP',
    'PUDUCHERRY'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!state) {
      setError('Please select a state');
      return;
    }

    // Split full name into first and last
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Build request body exactly matching RegisterRequest
    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber,   // map phone to mobileNumber
      email: email,
      state: state,                 // selected state
      password: password,
      otpToken: "default_token"     // placeholder to satisfy backend if needed
    };

    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Use full URL if not using proxy
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      // Handle non-JSON responses or empty responses (like 403)
      const contentType = response.headers.get("content-type");
      let data = {};

      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.warn("Received non-JSON response:", text);
      }

      if (response.ok && data.success) {
        setMessage('Registration successful! Please login.');
      } else {
        setError(data.message || `Registration failed (Status: ${response.status}). Please check backend logs.`);
      }
    } catch (err) {
      setError('Network error – could not reach server. Make sure backend is running.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 text-left">Create Citizen Account</h2>
        <p className="text-slate-500 mb-8 text-sm text-left">Fill in your official details to access government services.</p>

        {message && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">{message}</div>}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name (As per ID)</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Sadiya Shaikh"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="name@example.com"
              required
            />
          </div>

          {/* Mobile Number (phone) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10-digit number"
              required
              pattern="[0-9]{10}"
              title="Please enter a 10-digit mobile number"
            />
          </div>

          {/* Date of Birth (UI only) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* National ID / Aadhar (UI only) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">National ID / Aadhar</label>
            <input
              type="text"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="12-digit number"
            />
          </div>

          {/* State (required) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Select your state</option>
              {stateOptions.map((s) => (
                <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 mt-4 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register for SmartGov'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;