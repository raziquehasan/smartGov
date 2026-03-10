import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/services/${service.id}`)}
      className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-slate-100 dark:border-slate-800"
    >
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        {service.name}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
        {service.description}
      </p>
      <div className="flex justify-between text-xs text-slate-500">
        <span>Fee: {service.fee}</span>
        <span>Processing: {service.time}</span>
      </div>
    </div>
  );
};

export default ServiceCard;