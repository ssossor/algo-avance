"use server";

import { NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { getSession } from "@/utils/sessions";

export async function POST(req: Request) {
    // Get body request
    const body = await req.json();
    const { idduck } = body; // idduck is an id (number)

    const userid = await getSession();

    const result = await writedb(userid.rowid, idduck);
    if (result == false) {
        return NextResponse.json(
            { message: "User already exists" },
            { status: 403 }
        );
    }

    return NextResponse.json({ result });
}

async function writedb(iduser: number, idduck: number) {
    let db = null;

    if (!db) {
        // If the database instance is not initialized, open the database connection
        db = await open({
            filename: process.env.DATABASE_NAME || "", // Specify the database file path
            driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
        });
    }

    const query = `INSERT INTO views (iduser, idduck) VALUES (?, ?)`;
    const result = await db.get(query, iduser, idduck);

    return result
}