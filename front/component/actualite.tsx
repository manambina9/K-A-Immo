// app/page.tsx
export const dynamic = "force-dynamic"; // pour forcer l'exécution côté serveur

async function getRealEstateNews() {
  const apiKey = process.env.GNEWS_API_KEY;
  const url = `https://gnews.io/api/v4/search?q=immobilier&lang=fr&in=title&max=4&token=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Erreur lors du fetch des actus immobilières");

  const data = await res.json();
  return data.articles;
}

export default async function HomePage() {
  const news = await getRealEstateNews();

  return (
    <main className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-700">
        🏠 Actus immobilières 
      </h1>

      {news.length === 0 ? (
        <p className="text-center text-gray-500">Aucune actualité disponible pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article: any, i: number) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col justify-between h-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3">{article.description}</p>
                <div className="mt-4 text-right text-xs text-gray-500">
                  Source : {article.source.name}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
