import React from 'react';

interface AppointmentCardProps {
  time: string;
  date: string;
  title: string;
  client: string;
  address: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ time, date, title, client, address }) => {
  return (
    <div className="border rounded-lg p-3 hover:bg-gray-50">
      <div className="flex">
        <div className="w-16 text-center">
          <p className="font-bold">{time}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
        <div className="ml-3 flex-1">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-600">{client}</p>
          <p className="text-xs text-gray-500">{address}</p>
        </div>
        <div>
          <button className="text-blue-500 hover:text-blue-700">Détails</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;