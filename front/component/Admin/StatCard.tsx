import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-100', text: 'text-blue-800', iconBg: 'bg-blue-200', iconText: 'text-blue-600' };
      case 'green':
        return { bg: 'bg-green-100', text: 'text-green-800', iconBg: 'bg-green-200', iconText: 'text-green-600' };
      case 'purple':
        return { bg: 'bg-purple-100', text: 'text-purple-800', iconBg: 'bg-purple-200', iconText: 'text-purple-600' };
      case 'yellow':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', iconBg: 'bg-yellow-200', iconText: 'text-yellow-600' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', iconBg: 'bg-gray-200', iconText: 'text-gray-600' };
    }
  };

  const { bg, text, iconBg, iconText } = getColorClasses(color);

  return (
    <div className={`p-6 rounded-lg shadow ${bg}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{value}</h3>
          <p className={`text-sm ${text}`}>{title}</p>
        </div>
        <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center`}>
          <span className={`text-lg ${iconText}`}>
            {color === 'blue' && '🏠'}
            {color === 'green' && '🔑'}
            {color === 'purple' && '💰'}
            {color === 'yellow' && '📅'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
