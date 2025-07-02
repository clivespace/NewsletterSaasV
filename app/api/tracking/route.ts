import { type NextRequest, NextResponse } from "next/server"

// A 1x1 transparent GIF
const GIF_DATA = Buffer.from("R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", "base64")

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const newsletterId = searchParams.get("n_id")
  const subscriberId = searchParams.get("s_id")

  if (newsletterId && subscriberId) {
    // In a real app, the database transaction happens here.
    // For now, we'll just log the event to the console.
    console.log(`Tracking open for newsletter ${newsletterId} and subscriber ${subscriberId}`)
    // await sql.transaction([
    //   sql`UPDATE newsletters SET opens = opens + 1 WHERE id = ${newsletterId}`,
    //   sql`UPDATE subscribers SET opens = opens + 1 WHERE id = ${subscriberId}`,
    // ]);
  }

  return new NextResponse(GIF_DATA, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  })
}
