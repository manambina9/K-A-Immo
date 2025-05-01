function MessageContact({ name, message, time, unread, active }: { name: string; message: string; time: string; unread: boolean; active: boolean }) {
    return (
      <div className={`border-b px-4 py-3 hover:bg-gray-50 cursor-pointer ${active ? 'bg-blue-50' : ''}`}>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 font-bold">{name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h4 className={`font-medium ${unread ? 'font-bold' : ''}`}>{name}</h4>
              <span className="text-xs text-gray-500">{time}</span>
            </div><div className="flex justify-between items-center">
              <h4 className={`font-medium ${unread ? 'font-bold' : ''}`}>{name}</h4>
              <span className="text-xs text-gray-500">{time}</span>
            </div>
            <p className={`text-sm truncate ${unread ? 'font-semibold' : 'text-gray-600'}`}>
              {message}
            </p>
          </div>
          {unread && (
            <div className="ml-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
export default MessageContact;