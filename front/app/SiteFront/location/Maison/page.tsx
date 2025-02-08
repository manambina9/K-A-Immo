
import Head from '../../../../component/header'
export default function LocationHome() {
    return (
      <>
      <Head />
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold">Bienvenue sur mon site Next.js !</h1>
          <p className="text-gray-600 mt-2">Une page simple avec Next.js 13+</p>
          <a href="/about" className="mt-4 inline-block text-blue-500 hover:underline">
            En savoir plus
          </a>
        </div>
      </main>
      </>
    );
  }
  