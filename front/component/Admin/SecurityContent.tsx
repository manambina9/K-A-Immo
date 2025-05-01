function SecurityContent() {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-6">Sécurité et accès</h3>
  
        <div className="mb-8">
          <h4 className="text-md font-medium mb-4">Utilisateurs du système</h4>
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-3 border-b">Utilisateur</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Rôle</th>
                <th className="p-3 border-b">Dernière connexion</th>
                <th className="p-3 border-b">Statut</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Admin Principal</td>
                <td className="p-3">admin@agence.com</td>
                <td className="p-3">Administrateur</td>
                <td className="p-3">24/04/2025 08:15</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Actif
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-500 hover:text-blue-700">Modifier</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Sophie Dubois</td>
                <td className="p-3">sophie.dubois@agence.com</td>
                <td className="p-3">Agent</td>
                <td className="p-3">24/04/2025 09:30</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Actif
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-500 hover:text-blue-700">Modifier</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Thomas Martin</td>
                <td className="p-3">thomas.martin@agence.com</td>
                <td className="p-3">Directeur</td>
                <td className="p-3">23/04/2025 17:45</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Actif
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-500 hover:text-blue-700">Modifier</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">Marc Dubois</td>
                <td className="p-3">marc.dubois@agence.com</td>
                <td className="p-3">Agent</td>
                <td className="p-3">22/04/2025 10:20</td>
                <td className="p-3">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Inactif
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-500 hover:text-blue-700">Modifier</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div className="mb-8">
          <h4 className="text-md font-medium mb-4">Journal des activités</h4>
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-3 border-b">Date & Heure</th>
                <th className="p-3 border-b">Utilisateur</th>
                <th className="p-3 border-b">Action</th>
                <th className="p-3 border-b">Détails</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">24/04/2025 10:15</td>
                <td className="p-3">Sophie Dubois</td>
                <td className="p-3">Création</td>
                <td className="p-3">Nouveau bien immobilier (REF-A1289)</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">24/04/2025 09:45</td>
                <td className="p-3">Admin Principal</td>
                <td className="p-3">Modification</td>
                <td className="p-3">Compte utilisateur (Thomas Martin)</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">24/04/2025 09:30</td>
                <td className="p-3">Thomas Martin</td>
                <td className="p-3">Suppression</td>
                <td className="p-3">Rendez-vous client (ID-45678)</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">24/04/2025 08:15</td>
                <td className="p-3">Admin Principal</td>
                <td className="p-3">Connexion</td>
                <td className="p-3">Connexion au système réussie</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div>
          <h4 className="text-md font-medium mb-4">Paramètres de sécurité</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h5 className="font-medium">Authentification à deux facteurs</h5>
                <p className="text-sm text-gray-600">Renforcer la sécurité des comptes utilisateurs</p>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={true} readOnly />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
  
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h5 className="font-medium">Verrouillage de compte après tentatives échouées</h5>
                <p className="text-sm text-gray-600">Verrouiller les comptes après 5 tentatives de connexion infructueuses</p>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={true} readOnly />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
  
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h5 className="font-medium">Politique de mot de passe forte</h5>
                <p className="text-sm text-gray-600">Exiger des mots de passe complexes et une rotation régulière</p>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={true} readOnly />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
  
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h5 className="font-medium">Journal d'audit avancé</h5>
                <p className="text-sm text-gray-600">Enregistrer toutes les actions des utilisateurs pour audit</p>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={false} readOnly />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default SecurityContent;