// app/api/contact/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Récupérer les données du formulaire
    const formData = await request.json();
    
    // Vérifier que toutes les informations requises sont présentes
    if (!formData.name || !formData.email || !formData.message || !formData.subject) {
      return NextResponse.json(
        { error: "Informations manquantes" },
        { status: 400 }
      );
    }
    
    // Ici, vous pourriez envoyer un email avec les informations reçues
    // Par exemple avec Nodemailer, SendGrid, etc.
    
    console.log('Formulaire reçu:', formData);
    
    // Simuler un délai pour montrer le spinner (à supprimer en production)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Réponse de succès
    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors du traitement du formulaire:', error);
    
    return NextResponse.json(
      { error: "Une erreur est survenue lors du traitement de votre demande" },
      { status: 500 }
    );
  }
}