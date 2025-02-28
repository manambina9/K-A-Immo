export default function AuthErrorPage({ searchParams }) {
  // `searchParams` contient les paramètres de l'URL, comme `?error=OAuthSignin`
  const error = searchParams.error;

  let errorMessage = "Une erreur s'est produite lors de l'authentification.";

  // Vous pouvez personnaliser le message d'erreur en fonction du type d'erreur
  if (error === "OAuthSignin") {
    errorMessage = "Une erreur s'est produite lors de la connexion avec le fournisseur OAuth.";
  } else if (error === "Callback") {
    errorMessage = "Une erreur s'est produite lors du callback de l'authentification.";
  }

  return (
    <div>
      <h1>Erreur dauthentification</h1>
      <p>{errorMessage}</p>
    </div>
  );
}