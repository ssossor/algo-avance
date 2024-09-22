"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSession } from "@/utils/sessions";

export default function Page() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const idduck = useSearchParams().get("idduck");
    const response = fetch("/api/views", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idduck: idduck
          })
    });

    const showCarousel = () => {
        const list = [
          {
            title: "Veuillez voter",
            description: "Choisissez une note",
            actions: [
              {
                label: "1 étoile",
                url: `/vote?oeuvre_id=`+ idduck +`&rating=1`,
              },
              {
                label: "2 étoiles",
                url: `/vote?oeuvre_id=`+ idduck +`&rating=2`,
              },
              {
                label: "3 étoiles",
                url: `/vote?oeuvre_id=`+ idduck +`&rating=3`,
              },
              {
                label: "4 étoiles",
                url: `/vote?oeuvre_id=`+ idduck +`&rating=4`,
              },
              {
                label: "5 étoiles",
                url: `/vote?oeuvre_id=`+ idduck +`&rating=5`,
              },
            ],
          },
        ];
      
        Crisp.message.show("carousel", {
          text: "Voici le vote",
          targets: list,
        });
      };

      const showRecommandation = () => {

        const randomId =   Math.floor(Math.random() * 2) + 1;
      
        const list = [
          {
            title: "Voici un canard",
            description: randomId === 1 ? "Appleyard argenté, originaire du Royaume-Uni" : "Canard doré, magnifique oiseau",
            actions: [
              {
                label: "Cliquez ici pour aller voir les détails",
                url: "/oeuvres?idduck="+randomId,
              },
            ],
          },
        ];
      
        Crisp.message.show("carousel", {
          text: "Découvrez un canard",
          targets: list,
        });
      }; 
      
  
    const userLogin = () => {
      // Configuration de Crisp (obligatoire pour utiliser le bot sur votre site)
      Crisp.configure(process.env.NEXT_PUBLIC_WEBSITE_ID || "", {
        autoload: false,
      });
      // Récupération de l'historique d'une conversation Crisp
      Crisp.setTokenId("token");
      // Affichage du bot (utile uniquement si 'autoload: false' dans la configuration)
      Crisp.load();
      // Ouverture du bot
      Crisp.chat.open();
    };
  
    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const session = await getSession();
          if (session) {
            setIsLoggedIn(true);
            setError(null);
            userLogin();
          } else {
            setIsLoggedIn(false);
            setError("Vous devez être connecté pour accéder à cette page.");
          }
        } catch (err) {
          console.error(err);
          setError("Une erreur est survenue lors de la vérification de la session.");
        }
      };
  
      checkLoginStatus();
      showRecommandation();
    }, []);
  
    if (error) {
        return <p>{error}</p>;
    }
  
    if (!isLoggedIn) {
        // Afficher un message d'erreur si l'utilisateur n'est pas connecté
        return <p>Vous devez être connecté pour voir cette page.</p>;
    }

    return (
        <>
            {idduck == "1" && (
                <>
                <h1>Appleyard argenté</h1>
                <br />
                <h3>
                    Origine et Histoire L'Appleyard argenté est une race de canard domestique développée au Royaume-Uni...
                </h3>
                </>
            )}
            {idduck == "2" && (
                <>
                    <h1>Golden Cascade</h1>
                    <br />
                    <h3>Origine et Histoire Le Golden Cascade est une race de canard domestique originaire des États-Unis. Développée dans les années 1980 par le Dr. Don H. Smith, cette race est le résultat du croisement entre le canard Call et le canard Runner. Elle a été sélectionnée principalement pour ses qualités esthétiques et son comportement agréable.</h3>
                </>
            )}
            <button onClick={showCarousel}>Voter</button>
        </>
    )

}