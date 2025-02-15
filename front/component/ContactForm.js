'use client'

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message envoyé avec succès !");
        setFormData({ nom: "", prenom: "", email: "", telephone: "", message: "" });
      } else {
        const errorData = await response.json();
        setStatus(errorData.error || "Erreur lors de l'envoi.");
      }
    } catch (error) {
        if(error instanceof TypeError){
            setStatus("Erreur de connexion au serveur.");
        }
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Contactez-nous</h2>
      {status && <p className="mb-4 text-red-500">{status}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required className="border p-2 w-full"/>
        <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required className="border p-2 w-full"/>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border p-2 w-full"/>
        <input type="tel" name="telephone" placeholder="Téléphone (optionnel)" value={formData.telephone} onChange={handleChange} className="border p-2 w-full"/>
        <textarea name="message" placeholder="Votre message" value={formData.message} onChange={handleChange} required className="border p-2 w-full"/>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Envoyer</button>
      </form>
    </div>
  );
}
