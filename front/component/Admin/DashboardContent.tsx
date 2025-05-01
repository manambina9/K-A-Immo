import React from 'react';
import StatCard from './StatCard';
import PropertiesContent from '../Admin/PropertiesContent'
const DashboardContent: React.FC = () => {
  const stats = [
    { title: 'Biens immobiliers', value: '120', color: 'blue' },
    { title: 'Clients', value: '85', color: 'green' },
    { title: 'Agents', value: '15', color: 'purple' },
    { title: 'Rendez-vous', value: '30', color: 'yellow' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Bienvenue sur le tableau de bord</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} color={stat.color} />
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Propriétés récentes</h3>
        <PropertiesContent />
    </div>
    </div>
  );
};

export default DashboardContent;