function PropertiesContent() {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Liste des biens immobiliers</h3>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Ajouter un bien
          </button>
        </div>
  
        <div className="flex mb-4">
          <input 
            type="text" 
            placeholder="Rechercher un bien..." 
            className="px-4 py-2 border rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-gray-100 px-4 py-2 border border-l-0 rounded-r-md hover:bg-gray-200">
            Rechercher
          </button>
        </div>
  
        <table className="w-full">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-3 border-b">Référence</th>
              <th className="p-3 border-b">Type</th>
              <th className="p-3 border-b">Adresse</th>
              <th className="p-3 border-b">Surface</th>
              <th className="p-3 border-b">Prix</th>
              <th className="p-3 border-b">Statut</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">REF-A1254</td>
              <td className="p-3">Appartement</td>
              <td className="p-3">12 rue Victor Hugo</td>
              <td className="p-3">75 m²</td>
              <td className="p-3">260 000 €</td>
              <td className="p-3">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  À vendre
                </span>
              </td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">Éditer</button>
                  <button className="text-red-500 hover:text-red-700">Supprimer</button>
                </div>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">REF-L0872</td>
              <td className="p-3">Maison</td>
              <td className="p-3">5 avenue des Lilas</td>
              <td className="p-3">120 m²</td>
              <td className="p-3">1 200 €/mois</td>
              <td className="p-3">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  À louer
                </span>
              </td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">Éditer</button>
                  <button className="text-red-500 hover:text-red-700">Supprimer</button>
                </div>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">REF-V2451</td>
              <td className="p-3">Villa</td>
              <td className="p-3">18 rue du Lac</td>
              <td className="p-3">180 m²</td>
              <td className="p-3">495 000 €</td>
              <td className="p-3">
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  Option
                </span>
              </td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">Éditer</button>
                  <button className="text-red-500 hover:text-red-700">Supprimer</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Affichage 1-3 sur 211 résultats</span>
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">Précédent</button>
            <button className="px-3 py-1 border rounded bg-blue-500 text-white">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">3</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">Suivant</button>
          </div>
        </div>
      </div>
    );
  }
export default PropertiesContent;
