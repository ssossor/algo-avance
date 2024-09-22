"use server";

import { NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { getSession } from "@/utils/sessions";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { oeuvre_id, rating } = body; // Récupération de l'oeuvre et de la note
    const sessionCookie = await getSession();


    if (!sessionCookie) {
        return NextResponse.json({ error: "Utilisateur non connecté" }, { status: 403 });
      }
    const user_id = sessionCookie.rowid;

    if (!oeuvre_id || !rating) {
      return NextResponse.json({ success: false, message: "Données invalides" }, { status: 400 });
    }

    // Ouvrir la connexion à la base de données
    const db = await open({
      filename: process.env.DATABASE_NAME || "", // Assure-toi que le chemin de la base de données est correct
      driver: sqlite3.Database,
    });

    const existingVote = await db.get(
        `SELECT * FROM votes WHERE iduser = ? AND idduck = ?`,
        [user_id, oeuvre_id]
      );

      if (existingVote) {
        // Mise à jour du vote existant
        await db.run(
          `UPDATE votes SET rating = ? WHERE iduser = ? AND idduck = ?`,
          [rating, user_id, oeuvre_id]
        );
      } else {
        // Insertion d'un nouveau vote
        await db.run(
          `INSERT INTO votes (iduser, idduck, rating) VALUES (?, ?, ?)`,
          [user_id, oeuvre_id, rating],
          
        );
      }

    return NextResponse.json({ success: true, message: "Vote enregistré avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du vote:", error);
    return NextResponse.json({ success: false, message: "Erreur interne" }, { status: 500 });
  }
}
