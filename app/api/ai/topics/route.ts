import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

// IMPORTANT: Set the OPENAI_API_KEY environment variable to use this.
// If you don't have one, the route will return a mock response.

export async function POST(req: NextRequest) {
  const { keywords }: { keywords: string } = await req.json()

  if (!process.env.OPENAI_API_KEY) {
    // Mock response for V0 preview without API key
    const mockResponse = `
      1. **The Real Reason Your Emails Aren't Getting Opened** - Hook: It's not your subject line, it's this one simple mistake.
      2. **How We Grew Our List by 300% Using One Weird Trick** - Hook: This counter-intuitive strategy actually works.
      3. **The Most Underrated Tool for Email Marketers in 2025** - Hook: You probably already have it, but you're not using it right.
    `
    return new NextResponse(mockResponse)
  }

  const prompt = `You are an expert newsletter writer. Given the keywords "${keywords}", generate 3 compelling newsletter topic ideas. For each topic, provide a title and a short, catchy hook. Format your response as a numbered list with markdown for titles.`

  const result = await streamText({
    model: openai("gpt-4o"),
    prompt: prompt,
  })

  return result.toAIStreamResponse()
}
