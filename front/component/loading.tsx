import { ClipLoader } from 'react-spinners'; // Import du spinner

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay = ({ message }: LoadingOverlayProps) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-10">
      <p className="text-white mb-4 text-lg">
        {message || 'Veuillez patienter, nous traitons votre demande...'}
      </p>
      <ClipLoader size={50} color="#ffffff" />
    </div>
  );
};

export default LoadingOverlay;
