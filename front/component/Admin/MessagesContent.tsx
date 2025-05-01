import MessageContact from './MessageContact'; // Adjust the path as needed

function MessagesContent() {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="flex h-full">
          <div className="w-1/3 border-r">
            <div className="p-4 border-b">
              <input 
                type="text" 
                placeholder="Rechercher une conversation..." 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="overflow-y-auto h-full">
              <MessageContact 
                name="Sophie Dubois" 
                message="Quand pourrons-nous visiter l'appartement?" 
                time="10:24" 
                unread={true} 
                active={true}
              />
              <MessageContact 
                name="Thomas Martin" 
                message="Merci pour les informations sur la villa" 
                time="Hier" 
                unread={false} 
                active={false}
              />
              <MessageContact 
                name="Marie Leroy" 
                message="Pouvez-vous m'envoyer les documents?" 
                time="Lundi" 
                unread={false} 
                active={false}
              />
              <MessageContact 
                name="Jean Dupont"
                message="Est-ce que le prix est négociable?" 
                time="15/04" 
                unread={false} 
                active={false}
              />
            </div>
          </div>
          <div className="w-2/3 flex flex-col">
            <div className="p-4 border-b flex items-center">
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">S</span>
              </div>
              <div className="ml-3">
                <h3 className="font-medium">Sophie Dubois</h3>
                <p className="text-xs text-gray-500">En ligne</p>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-end">
                  <div className="max-w-xs md:max-w-md bg-gray-100 rounded-lg p-3">
                    <p className="text-sm">Bonjour, je suis intéressée par l'appartement T3 au 12 rue Victor Hugo. Est-il toujours disponible ?</p>
                    <p className="text-xs text-gray-500 mt-1">10:15</p>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <div className="max-w-xs md:max-w-md bg-blue-100 rounded-lg p-3">
                    <p className="text-sm">Bonjour Sophie, oui l'appartement est toujours disponible. Souhaitez-vous le visiter ?</p>
                    <p className="text-xs text-gray-500 mt-1">10:18</p>
                  </div>
                </div>
                <div className="flex items-end">
                  <div className="max-w-xs md:max-w-md bg-gray-100 rounded-lg p-3">
                    <p className="text-sm">Oui, j'aimerais beaucoup le visiter. Quand est-ce possible ?</p>
                    <p className="text-xs text-gray-500 mt-1">10:24</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Tapez votre message..." 
                  className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md">
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default MessagesContent;