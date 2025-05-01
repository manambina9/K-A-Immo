"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // ✅ Correction ici

export default function NewPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null); // ✅ Stocke le token ici
  const router = useRouter();

  // ✅ Récupération correcte du token
  useEffect(() => {
    const urlToken = window.location.pathname.split("/").pop();
    if (urlToken && urlToken !== "newpass") {
      setToken(urlToken);
      console.log("Token récupéré :", urlToken);
    } else {
      setMessage("Lien invalide ou expiré.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    const urlToken = window.location.pathname.split("/").pop();
    if (urlToken && urlToken !== "newpass") {
      setToken(urlToken);
      console.log("Token récupéré :", urlToken);
    } else {
      setMessage("Lien invalide ou expiré.");
    }
    if (!token) {
      setMessage("Token invalide ou expiré.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/reset/reset/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();
      console.log(result); // ✅ Affiche la réponse du backend

      if (response.ok) {
        setMessage("Votre mot de passe a été mis à jour avec succès.");
        setTimeout(() => router.push("/login"), 3000); // ✅ Redirection après succès
      } else {
        setMessage(result.message || "Erreur : Veuillez réessayer.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage("Une erreur est survenue. Veuillez réessayer.");
    }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center">Nouveau mot de passe</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="confirmPassword" className="block mt-4 text-sm font-medium text-gray-700">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Button
              type="submit"
              className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Mettre à jour le mot de passe
            </Button>

            {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
