'use client'

import React, { useState } from "react";
import Styles from '../public/css/contact.module.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    interet: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.left}>
        <h2>TROUVER VOTRE MAISON</h2>
        <p>
          Paragraphe. Vous pouvez le modifier et ajouter votre texte. Double-cliquez ici ou cliquez sur « Modifier le texte » pour ajouter votre contenu et personnaliser la police.
        </p>
      </div>
      <div className={Styles.right}>
        <h2>NOUS CONTACTER</h2>
        <form onSubmit={handleSubmit} className={Styles.form}>
          <div className={Styles.row}>
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              className={Styles.input}
            />
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              className={Styles.input}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="E-mail *"
            value={formData.email}
            onChange={handleChange}
            className={Styles.input}
          />
          <div className={Styles.row}>
            <label className={Styles.label}>
              <input
                type="radio"
                name="interet"
                value="Achat"
                onChange={handleChange}
              />
              Achat
            </label>
            <label className={Styles.label}>
              <input
                type="radio"
                name="interet"
                value="Location"
                onChange={handleChange}
              />
              Location
            </label>
            <label className={Styles.label}>
              <input
                type="radio"
                name="interet"
                value="Autre"
                onChange={handleChange}
              />
              Autre
            </label>
          </div>
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className={Styles.textarea}
          />
          <button type="submit" className={Styles.button}>
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
