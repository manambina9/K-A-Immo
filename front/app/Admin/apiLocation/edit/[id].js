// app/Admin/apiLocation/edit/[id]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditMaison() {
  const router = useRouter();
  const params = useParams();

  const [maison, setMaison] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/api/maisons/${params.id}`);
      const data = await res.json();
      setMaison(data);
    };
    fetchData();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8000/api/maisons/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(maison),
    });

    router.push("/Admin/apiLocation");
  };

  if (!maison) return <p>Chargement...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>Nom :</label>
      <input
        value={maison.nom}
        onChange={(e) => setMaison({ ...maison, nom: e.target.value })}
      />
      <button type="submit">Modifier</button>
    </form>
  );
}
