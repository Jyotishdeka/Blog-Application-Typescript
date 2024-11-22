import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");

  // Validate the secret
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: "Invalid secret key" },
      { status: 401 }
    );
  }

  // Validate the path
  if (!path) {
    return NextResponse.json({ message: "Path query is missing" }, { status: 400 });
  }

  try {
    // Trigger revalidation for the specific path
    await fetch(`https://blog-application-typescript-vvz6.vercel.app/${path}`, {
      method: "GET",
      headers: { "x-next-revalidate": process.env.REVALIDATION_SECRET || "" },
    });

    return NextResponse.json({
      message: `Revalidation triggered for ${path}`,
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error triggering revalidation" },
      { status: 500 }
    );
  }
}
