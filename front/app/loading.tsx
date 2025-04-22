// app/loading.tsx
export default function Loading() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
          
          {/* Texte animé */}
          <div className="flex space-x-2">
            <div className="animate-pulse text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Chargement
            </div>
            <div className="flex space-x-1">
              <div className="animate-bounce delay-100">.</div>
              <div className="animate-bounce delay-200">.</div>
              <div className="animate-bounce delay-300">.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }