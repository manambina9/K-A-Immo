import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TokenExpired() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/login");
    }, 5000); // Redirection après 5 secondes

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-semibold text-red-600">Session expirée</h1>
        <p className="mt-2 text-gray-700">Votre session a expiré. Veuillez vous reconnecter.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => router.push("/login")}
        >
          Reconnexion
        </button>
      </div>
    </div>
  );
}
