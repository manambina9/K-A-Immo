import React from 'react';
import AgentCard from './AgentCard';

const agents = [
  { name: 'Sophie Dubois', role: 'Agent Senior', email: 'sophie.dubois@agence.com', phone: '06 12 34 56 78', properties: 15 },
  { name: 'Thomas Martin', role: 'Directeur Commercial', email: 'thomas.martin@agence.com', phone: '06 23 45 67 89', properties: 22 },
  { name: 'Laure Vincent', role: 'Agent Immobilier', email: 'laure.vincent@agence.com', phone: '07 34 56 78 90', properties: 12 },
  { name: 'Marc Dubois', role: 'Agent Immobilier', email: 'marc.dubois@agence.com', phone: '06 45 67 89 01', properties: 9 },
  { name: 'Julie Bertrand', role: 'Agent Junior', email: 'julie.bertrand@agence.com', phone: '07 56 78 90 12', properties: 7 },
];

const AgentsContent: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Équipe d'agents immobiliers</h3>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Ajouter un agent
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <AgentCard key={index} {...agent} />
        ))}
      </div>
    </div>
  );
};

export default AgentsContent;