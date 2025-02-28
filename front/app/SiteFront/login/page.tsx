'use client';

import Header from '../../../component/header';
import Footer from '../../../component/footer';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Example() {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      username,
      password,
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
        console.log('hello');
        window.location.href = '../../User/Dashboard';
      } else {
        console.error('Erreur du serveur:', data);
        setMessage('Erreur: ' + (data.message || 'Identifiant ou mot de passe incorrecte.'));
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage('Erreur réseau: ' + error.message);
      } else {
        setMessage('Erreur inconnue');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Connectez-vous à votre compte
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={username}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="text-sm">
                  <a
                    href="../../SiteFront/reset"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Se connecter
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
          <p className="mt-6 text-center text-sm text-gray-600">
            Pas encore inscrit ?{' '}
            <a href="../SiteFront/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sinscrire
            </a>
          </p>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => signIn('google')}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <Image
                  src="/image/google-logo.png" 
                  alt="Google"
                  width={24}
                  height={24}
                />
              </button>
              <button
                onClick={() => signIn('facebook')}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <Image
                  src="/image/facebook-logo.png" // Remplace par le chemin de ton logo Facebook
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>

        {session && (
          <div className="mt-8 text-center">
            <p className="text-gray-700">Connecté en tant que {session?.user?.email}</p>
            <button
              onClick={() => signOut()}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Se déconnecter
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}