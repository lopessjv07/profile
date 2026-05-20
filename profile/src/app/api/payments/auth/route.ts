import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Native Web Crypto SHA-256 helper (compatible with Node.js & Edge Runtime)
async function getSessionHash(password: string) {
  const msgBuffer = new TextEncoder().encode(password + "lopes_profile_salt_2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password !== adminPassword) {
      return NextResponse.json(
        { success: false, message: "Senha incorreta" },
        { status: 401 }
      );
    }

    const sessionHash = await getSessionHash(adminPassword);
    const cookieStore = await cookies();

    cookieStore.set({
      name: "admin_session",
      value: sessionHash,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({ success: true, message: "Autenticado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "admin_session",
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0, // Immediately delete
  });

  return NextResponse.json({ success: true, message: "Sessão encerrada" });
}
