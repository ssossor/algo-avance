"use client";
 
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAuth, isLogged, logout } from "@/utils/sessions";
 
export default function Nav() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [session, setSession] = useState("")
 
    useEffect(() => {
        const blip = isLogged();
        blip.then((response) => setSession(response))
    }, []);
 
    const Logout = () => {
        logout();
        return router.push("/login");
    };
 
    return (
        <nav>
            <Link href="/home">Accueil</Link>
            {session != "" && (
                session == "logged" ? (
                    <>
                        <Link href="/profile">Mon compte</Link>
                        <button onClick={Logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link href="/login">Se connecter</Link>
                        <Link href="/register">S'inscrire</Link>
                    </>
            ))}
        </nav>
    );
}