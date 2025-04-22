'use client'
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '../../../component/header';
import Footer from '../../../component/footer';
import { useState, useEffect } from 'react';

export default function ConnexionPage() {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { isAuthenticated, login } = useAuth(); // Utiliser le contexte d'authentification
  const router = useRouter(); // Pour la redirection

  // Rediriger l'utilisateur s'il est déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/User/Dashboard'); // Rediriger vers le tableau de bord
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      username,
      password
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        login(data.token, data.user); // Mettre à jour l'état d'authentification et stocker le token
        router.push('/User/Dashboard'); // Rediriger vers le tableau de bord
      } else {
        console.error('Erreur du serveur:', data);
        setMessage('Erreur: ' + (data.message || 'Identifiant ou mot de passe incorrect.'));
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage('Erreur réseau: ' + error.message);
      } else {
        setMessage('Erreur inconnue');
      }
    }
  };

  // Si l'utilisateur est déjà connecté, ne pas afficher le formulaire
  if (isAuthenticated) {
    return null; // Ou un message de redirection
  }

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Connectez-vous à votre compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Adresse email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={username}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Mot de passe
                </label>
                <div className="text-sm">
                  <a href="../../SiteFront/reset" className="font-semibold text-[#D35400] hover:text-indigo-500">
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Se connecter
              </button>
            </div>
          </form>
          {message && <p className="text-center mt-4 text-red-600">{message}</p>}
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Pas encore inscrit ?{' '}
            <a href="../SiteFront/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              S{"'"}inscrire
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}