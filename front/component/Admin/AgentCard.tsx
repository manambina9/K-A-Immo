import React from 'react';

interface AgentCardProps {
  name: string;
  role: string;
  email: string;
  phone: string;
  properties: number;
}

const AgentCard: React.FC<AgentCardProps> = React.memo(({ name, role, email, phone, properties }) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition duration-200">
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-3">
          <span className="text-blue-600 font-bold">{name.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <h4 className="font-medium text-lg">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <div className="mb-2">
        <p className="text-sm">
          <span className="font-medium">Email:</span> {email}
        </p>
        <p className="text-sm">
          <span className="font-medium">Tél:</span> {phone}
        </p>
        <p className="text-sm">
          <span className="font-medium">Biens gérés:</span> {properties}
        </p>
      </div>
      <div className="flex justify-end">
        <button
          className="text-blue-500 hover:text-blue-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          aria-label={`Voir le profil de ${name}`}
        >
          Voir le profil
        </button>
      </div>
    </div>
  );
});

export default AgentCard;