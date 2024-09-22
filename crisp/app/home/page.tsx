"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";
import { useState } from "react";
import { isLogged } from "@/utils/sessions";

import Nav from "@/components/Nav";
import Bot from "@/components/Bot"

export default function Home() {
    const [status, setStatus] = useState<string | null>(null);

    const showCarousel = () => {
        const list = [
            {
              title: "Voici le premier canard",
              description: "Appleyard argenté, originaire du Royaume-Uni",
              actions: [
                {
                  label: "Cliquez ici pour aller voir les details",
                  url: "/oeuvres?idduck=1",
                },
              ],
            },
            {
              title: "Voici le deuxieme canard",
              description: "Golden Cascade, originaire des Etats-Unis",
              actions: [
                {
                  label: "Cliquez ici pour aller voir les details",
                  url: "/oeuvres?idduck=2",
                },
              ],
            },
          ]
  
        Crisp.message.show("carousel", {
            text: "Voici les canards",
            targets: list,
        });
    }

    useEffect(() => {
        const blip = isLogged();
        blip.then((response) => setStatus(response));
    }, []);

    return (
        <>
        <h1>Accueil</h1>
        <Nav />
        {
            status != "" && (
                status == "logged" ? (<Bot />) : (<p style={{color: 'red'}}>Veuillez vous authentifiez pour utiliser le bot.</p>)
            )
        }
        <h1>Site des canards</h1>
        <br></br>
        <h3>Découvrez un monde fascinant dédié aux canards. Notre site vous propose une plongée unique dans l'univers de ces magnifiques oiseaux aquatiques. Que vous soyez passionné par les oiseaux, amateur de nature ou simplement curieux, vous trouverez ici une richesse d'informations et de ressources sur différentes espèces de canards.</h3>
        <br></br>
        {(status == "logged") && (<button onClick={showCarousel}>Afficher les canards</button>)}
        </>
    )
}