"use server";
 
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAuth } from "./utils/sessions";
 
export async function middleware(request: NextRequest) {
  const isAuthorized = await checkAuth();
 
  if (
    (request.nextUrl.pathname == "/profile" ||
      request.nextUrl.pathname == "/oeuvres" ||
      request.nextUrl.pathname == "/vote" ||
      request.nextUrl.pathname == "/api"
    ) &&
    isAuthorized.status >= 300
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}