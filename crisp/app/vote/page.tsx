"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VoteTestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oeuvre_id = searchParams.get("oeuvre_id");
  const rating = searchParams.get("rating");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const submitVote = async () => {
      if (oeuvre_id && rating) {
        try {
          const response = await fetch("/api/vote", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              oeuvre_id: Number(oeuvre_id),
              rating: Number(rating),
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              // Redirige après succès
              router.push("/home");
            } else {
              setError("Échec de l'enregistrement du vote");
            }
          } else {
            setError("Erreur lors de la requête au serveur");
          }
        } catch (error) {
          setError("Erreur réseau ou serveur");
        }
      } else {
        setError("Paramètres de vote invalides");
      }
      setLoading(false);
    };

    submitVote();
  }, [oeuvre_id, rating, router]);

  if (loading) {
    return <p>Traitement du vote...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return <p>Vote enregistré avec succès. Redirection...</p>;
}
