function ClientsContent() {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Gestion des clients</h3>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Ajouter un client
          </button>
        </div>
  
        <div className="flex mb-4">
          <input 
            type="text" 
            placeholder="Rechercher un client..." 
            className="px-4 py-2 border rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-gray-100 px-4 py-2 border border-l-0 rounded-r-md hover:bg-gray-200">
            Rechercher
          </button>
        </div>
  
        <table className="w-full">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-3 border-b">Nom</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Téléphone</th>
              <th className="p-3 border-b">Type</th>
              <th className="p-3 border-b">Agent</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">Marie Dupont</td>
              <td className="p-3">marie.dupont@email.com</td>
              <td className="p-3">06 12 34 56 78</td>
              <td className="p-3">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  Acheteur
                </span>
              </td>
              <td className="p-3">Thomas Martin</td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">Détails</button>
                  <button className="text-blue-500 hover:text-blue-700">Éditer</button>
                  <button className="text-red-500 hover:text-red-700">Supprimer</button>
                </div>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">Jean Leroy</td>
              <td className="p-3">jean.leroy@email.com</td>
              <td className="p-3">07 98 76 54 32</td>
              <td className="p-3">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Vendeur
                </span>
              </td>
              <td className="p-3">Sophie Dubois</td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">Détails</button>
                  <button className="text-blue-500 hover:text-blue-700">Éditer</button>
                  <button className="text-red-500 hover:text-red-700">Supprimer</button>
                </div>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">Pierre Moreau</td>
              <td className="p-3">pierre.moreau@email.com</td>
              <td className="p-3">06 23 45 67 89</td>
              <td className="p-3">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Locataire
                </span>
              </td>
              <td className="p-3">Laure Vincent</td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">Détails</button>
                  <button className="text-blue-500 hover:text-blue-700">Éditer</button>
                  <button className="text-red-500 hover:text-red-700">Supprimer</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Affichage 1-3 sur 148 résultats</span>
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
  export default ClientsContent;