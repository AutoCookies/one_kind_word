import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    '/api/message/route.ts',
  ],
}

export function checkToken (req: NextRequest) {
    const token = req.cookies.get("user_id");

    if (!token) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    const userId = token.value;

    if (!userId) {
        return NextResponse.json(
            { success: false, error: "Invalid token" },
            { status: 401 }
        );
    }

    return token;
}