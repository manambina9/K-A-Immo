'use client'

import Header from '../../../component/header'
import Footer from '../../../component/footer'
import { useState } from 'react'

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPlainPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérification si les mots de passe correspondent
    if (password !== password1) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    const userData = {
      email,
      password,
      password1
    };

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        window.location.href = '../../SiteFront/login';
      } else {
        console.error('Erreur : ' + data.message);
        setMessage(data.message); // Afficher le message d'erreur du backend
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Erreur inconnue');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  
            onSubmit={handleSubmit} 
            action="#" 
            method="POST" 
            className="space-y-6"
          >
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password1}
                  onChange={(e) => setPlainPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          {message && <p className="text-center mt-4 text-red-500">{message}</p>}
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?{' '}
            <a href="../SiteFront/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}
