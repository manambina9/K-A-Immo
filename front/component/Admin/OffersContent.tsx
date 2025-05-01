function OffersContent() {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Gestion des offres</h3>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Nouvelle offre
          </button>
        </div>
  
        <div className="space-y-4">
          <div className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Appartement - REF-A1254</h4>
                <p className="text-sm text-gray-600">12 rue Victor Hugo</p>
                <div className="mt-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    En attente
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">245 000 €</p>
                <p className="text-sm text-gray-600">Offre: 240 000 €</p>
              </div>
            </div>
            <div className="mt-3 border-t pt-3 flex justify-between items-center">
              <div>
                <p className="text-sm"><span className="font-medium">Client:</span> Jean Dupont</p>
                <p className="text-sm"><span className="font-medium">Date:</span> 20/04/2025</p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                  Accepter
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                  Refuser
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                  Contre-offre
                </button>
              </div>
            </div>
          </div>
  
          <div className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Villa - REF-V2451</h4>
                <p className="text-sm text-gray-600">18 rue du Lac</p>
                <div className="mt-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Acceptée
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">495 000 €</p>
                <p className="text-sm text-gray-600">Offre: 480 000 €</p>
              </div>
            </div>
            <div className="mt-3 border-t pt-3 flex justify-between items-center">
              <div>
                <p className="text-sm"><span className="font-medium">Client:</span> Marie Martin</p>
                <p className="text-sm"><span className="font-medium">Date:</span> 18/04/2025</p>
              </div>
              <div>
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm">
                  Détails
                </button>
              </div>
            </div>
          </div>
  
          <div className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Maison - REF-M8723</h4>
                <p className="text-sm text-gray-600">7 avenue du Parc</p>
                <div className="mt-2">
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Refusée
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">380 000 €</p>
                <p className="text-sm text-gray-600">Offre: 350 000 €</p>
              </div>
            </div>
            <div className="mt-3 border-t pt-3 flex justify-between items-center">
              <div>
                <p className="text-sm"><span className="font-medium">Client:</span> Paul Bernard</p>
                <p className="text-sm"><span className="font-medium">Date:</span> 15/04/2025</p>
              </div>
              <div>
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm">
                  Détails
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default OffersContent;