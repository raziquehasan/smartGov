import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard'; // we'll create this next

// Mock data – replace with actual API calls later
const mockServicesByCategory = {
  identity: [
    { id: 'aadhar-update', name: 'Update Aadhaar Details', description: 'Change address, name, or biometrics.', fee: 'Free', time: '3 days' },
    { id: 'pan-card', name: 'Apply for PAN Card', description: 'New PAN card application.', fee: '₹100', time: '7 days' },
    { id: 'voter-id', name: 'Voter ID Registration', description: 'Register as a voter.', fee: 'Free', time: '14 days' },
  ],
  health: [
    { id: 'ayushman-card', name: 'Ayushman Bharat Card', description: 'Health insurance for eligible families.', fee: 'Free', time: '5 days' },
    { id: 'covid-vaccine', name: 'COVID-19 Vaccination Certificate', description: 'Download your certificate.', fee: 'Free', time: 'Instant' },
  ],
  education: [
    { id: 'scholarship', name: 'Education Scholarship', description: 'Apply for government scholarships.', fee: 'Free', time: '30 days' },
  ],
  tax: [
    { id: 'gst-registration', name: 'GST Registration', description: 'Register for Goods and Services Tax.', fee: 'Free', time: '7 days' },
  ],
  transport: [
    { id: 'driving-license', name: 'Driving License', description: 'Apply for learner’s or permanent license.', fee: '₹500', time: '21 days' },
  ],
  social: [
    { id: 'pension', name: 'Old Age Pension', description: 'Apply for social security pension.', fee: 'Free', time: '15 days' },
  ],
};

const ServicesList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryNames = {
    identity: 'Identity & Civil',
    health: 'Public Health',
    education: 'Education',
    tax: 'Business & Tax',
    transport: 'Transport',
    social: 'Social Welfare',
  };

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setServices(mockServicesByCategory[categoryId] || []);
      setLoading(false);
    }, 300);
  }, [categoryId]);

  if (loading) return <div className="text-center py-20">Loading services...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-8 text-blue-600 hover:underline flex items-center gap-2"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {categoryNames[categoryId] || categoryId} Services
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-12">
          Select a service to apply or view details.
        </p>

        {services.length === 0 ? (
          <p className="text-center text-slate-500">No services available in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesList;