import StatCard from './StatCard';

function StatisticsContent() {
    const data = [
      { month: 'Jan', ventes: 5, locations: 8 },
      { month: 'Fév', ventes: 7, locations: 10 },
      { month: 'Mar', ventes: 9, locations: 12 },
      { month: 'Avr', ventes: 12, locations: 9 },
      { month: 'Mai', ventes: 10, locations: 7 },
      { month: 'Juin', ventes: 8, locations: 6 },
      { month: 'Juil', ventes: 15, locations: 11 },
      { month: 'Août', ventes: 13, locations: 9 },
      { month: 'Sep', ventes: 11, locations: 8 },
      { month: 'Oct', ventes: 9, locations: 10 },
      { month: 'Nov', ventes: 8, locations: 12 },
      { month: 'Déc', ventes: 10, locations: 14 },
    ];
  
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard title="Ventes ce mois" value="15" color="blue" />
          <StatCard title="Locations ce mois" value="12" color="green" />
          <StatCard title="Chiffre d'affaires" value="156 000 €" color="purple" />
          <StatCard title="Rendez-vous en attente" value="24" color="yellow" />
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Performance mensuelle</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Graphique des performances mensuelles</p>
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Répartition des biens</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Graphique en camembert de la répartition des biens</p>
            </div>
          </div>
        </div>
  
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Performance des agents</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-3 border-b">Agent</th>
                <th className="p-3 border-b">Ventes</th>
                <th className="p-3 border-b">Locations</th>
                <th className="p-3 border-b">Chiffre d'affaires</th>
                <th className="p-3 border-b">Taux de conversion</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Sophie Dubois</td>
                <td className="p-3">24</td>
                <td className="p-3">18</td>
                <td className="p-3">320 000 €</td>
                <td className="p-3">68%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Thomas Martin</td>
                <td className="p-3">32</td>
                <td className="p-3">15</td>
                <td className="p-3">450 000 €</td>
                <td className="p-3">72%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Laure Vincent</td>
                <td className="p-3">18</td>
                <td className="p-3">22</td>
                <td className="p-3">290 000 €</td>
                <td className="p-3">65%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Marc Dubois</td>
                <td className="p-3">15</td>
                <td className="p-3">20</td>
                <td className="p-3">240 000 €</td>
                <td className="p-3">58%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  export default StatisticsContent;
