import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user}) {
      // Ici, vous pouvez ajouter une logique pour vérifier l'authentification
      // Par exemple, vérifier si l'utilisateur est autorisé dans votre base de données Symfony
      const isAllowed = await checkUserInSymfonyBackend(user.email); // Fonction à implémenter
      if (isAllowed) {
        return true; // Autoriser la connexion
      } else {
        return "/auth/error"; // Rediriger vers la page d'erreur
      }
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    error: "/auth/error", // Rediriger vers votre page d'erreur personnalisée
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };