"use client";
 
import { useState } from "react";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export default function Page() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
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

    const checkLoginStatus = async () => {
        try {
            setIsLoggedIn(true);
            setError(null);
            userLogin();
        } catch (err) {
          console.error(err);
          setError("Une erreur est survenue lors de la vérification de la session.");
        }
    };

    useEffect(() => {
        checkLoginStatus();
        //<button onClick={showCarousel}>Afficher le carousel</button>
    }, []);

    if (error) {
      return <p>{error}</p>;
    }
    
    return (
        <>
        </>
    )
}