"use client";

import { useEffect } from "react";
import { useState } from "react";
import Nav from "@/components/Nav";
import Bot from "@/components/Bot";
import { isLogged } from "@/utils/sessions";

export default function Profile() {
	const [status, setStatus] = useState("");

    useEffect(() => {
        const status = isLogged();
        status.then((response) => setStatus(response))
    }, []);

    return (
        <>
        	<Nav />
			{(status == "logged") && (
				<Bot />
			)}
        	<h1>Mon compte</h1>
        	<p>Toutes les fonctionnalités sont disponibles sur la page d'accueil</p>
        </>
    )
}