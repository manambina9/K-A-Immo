import AppointmentCard from './AppointmentCard';

function AppointmentsContent() {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Gestion des rendez-vous</h3>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Planifier un rendez-vous
          </button>
        </div>
  
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">Aujourd'hui - 24 Avril 2025</h4>
          <div className="space-y-3">
            <AppointmentCard 
              time="09:30" 
              date="24/04/2025" 
              title="Visite Appartement" 
              client="Jean Martin" 
              address="12 rue de la Paix" 
            />
            <AppointmentCard 
              time="11:15" 
              date="24/04/2025" 
              title="Signature Compromis" 
              client="Marie Dubois" 
              address="5 avenue des Fleurs" 
            />
            <AppointmentCard 
              time="14:00" 
              date="24/04/2025" 
              title="Estimation" 
              client="Thomas Bernard" 
              address="8 boulevard Central" 
            />
          </div>
        </div>
  
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">Demain - 25 Avril 2025</h4>
          <div className="space-y-3">
            <AppointmentCard 
              time="10:00" 
              date="25/04/2025" 
              title="Visite Maison" 
              client="Laura Petit" 
              address="24 rue des Oliviers" 
            />
            <AppointmentCard 
              time="15:30" 
              date="25/04/2025" 
              title="Remise de clés" 
              client="Paul Durand" 
              address="15 avenue de la République" 
            />
          </div>
        </div>
  
        <div>
          <h4 className="text-md font-medium mb-3">À venir</h4>
          <div className="space-y-3">
            <AppointmentCard 
              time="11:00" 
              date="26/04/2025" 
              title="Visite Villa" 
              client="Sophie Martin" 
              address="3 impasse du Château" 
            />
            <AppointmentCard 
              time="14:30" 
              date="27/04/2025" 
              title="Rendez-vous Notaire" 
              client="Michel Blanc" 
              address="45 boulevard des Roses" 
            />
          </div>
        </div>
      </div>
    );
  }
  export default AppointmentsContent;