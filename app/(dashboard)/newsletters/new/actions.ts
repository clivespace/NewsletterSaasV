"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface Topic {
  id: string
  title: string
  description: string
  category: string
}

export async function generateTopics(keywords: string): Promise<Topic[]> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate 3 newsletter topic ideas based on these keywords: ${keywords}
      
      Return a JSON array with this exact format:
      [
        {
          "id": "unique_id",
          "title": "Topic Title",
          "description": "Brief description of the topic",
          "category": "Category name"
        }
      ]
      
      Make sure the topics are relevant to software development, technology, or business.
      Keep descriptions under 100 characters.
      Use categories like: Technology, Architecture, Design, Engineering, Business, etc.`,
    })

    const topics = JSON.parse(text)

    // Add unique IDs and ensure proper format
    return topics.map((topic: any, index: number) => ({
      id: `generated_${Date.now()}_${index}`,
      title: topic.title,
      description: topic.description,
      category: topic.category,
    }))
  } catch (error) {
    console.error("Error generating topics:", error)
    throw new Error("Failed to generate topics")
  }
}

export async function generateNewsletterDraft(
  title: string,
  topics: Topic[],
): Promise<{ html: string; newsletterId: string }> {
  try {
    const topicsText = topics.map((t) => `- ${t.title}: ${t.description}`).join("\n")

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an expert email copywriter and designer. Your task is to populate a given HTML newsletter template.
      You must follow the instructions exactly.
      - Use the provided HTML structure and CSS without any changes.
      - Generate content to replace the placeholder comments.
      - The content should be professional, engaging, and relevant to the provided topics.
      - For image placeholders, use the format: https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height={h}&width={w}&query={query-about-image}
      `,
      prompt: `
      Please populate the following HTML newsletter template.

      **Newsletter Title:** "${title}"

      **Topics to cover:**
      ${topicsText}

      **Instructions:**
      1.  **Main Content:** For each topic provided, create a content block. Each block should have:
          - An \`<h2>\` tag for the topic title.
          - A \`<h3>\` tag with a catchy sub-header.
          - A paragraph (\`<p>\`) expanding on the topic's description in 2-3 sentences.
          - A table with 3-4 key points, each with an icon, a bolded title, and a short description.
      2.  **Sidebar - Helpful Links:** Generate 4 relevant "Helpful Links". Each link should have a title and a brief, one-sentence description. The links should be relevant to the overall theme of the topics.
      3.  **Sidebar - Watch Video:** Generate a relevant title and a short summary for a "Watch Video" section.
      4.  **Image Placeholders:** Create relevant queries for all image placeholders.
      5.  **Do not alter the HTML structure or CSS.** Only replace the placeholder comments with the generated content.

      **HTML Template:**
      \`\`\`html
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body { margin: 0; padding: 0; background-color: #e9e9e9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
          .email-container { width: 100%; max-width: 800px; margin: 20px auto; background-color: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .navbar { padding: 15px 20px; display: flex; align-items: center; justify-content: space-between; background-color: #f7f7f7; border-bottom: 1px solid #dddddd; }
          .navbar .logo { height: 35px; }
          .navbar .nav-links a { color: #333333; text-decoration: none; font-size: 14px; font-weight: 800; margin-left: 15px; }
          .banner { height: 200px; overflow: hidden; }
          .banner img { width: 100%; height: 100%; object-fit: cover; display: block; }
          .main-content-wrapper { display: flex; flex-wrap: wrap; gap: 20px; padding: 20px; }
          .content { flex: 2; min-width: 300px; padding-right: 20px; color: #333; line-height: 1.6; overflow-wrap: break-word; word-wrap: break-word; }
          .content h1 { color: #333; font-size: 28px; margin-bottom: 10px; overflow-wrap: break-word; word-wrap: break-word; }
          .content h2 { color: #0d6efd; font-size: 22px; border-bottom: 2px solid #eeeeee; padding-bottom: 5px; margin-top: 30px; overflow-wrap: break-word; word-wrap: break-word; }
          .content h3 { font-size: 18px; color: #333; margin-bottom: 10px; overflow-wrap: break-word; word-wrap: break-word; }
          .content p { margin-bottom: 20px; overflow-wrap: break-word; word-wrap: break-word; max-width: 100%; }
          .key-points-table { width: 100%; border-spacing: 0 15px; margin: 20px 0; table-layout: fixed; }
          .key-points-table td { vertical-align: top; overflow-wrap: break-word; word-wrap: break-word; }
          .key-points-table .icon { width: 24px; padding-right: 12px; }
          .sidebar { flex: 1; min-width: 200px; padding: 20px; background-color: #f9f9f9; border-left: 1px solid #e0e0e0; overflow-wrap: break-word; word-wrap: break-word; }
          .sidebar h3 { color: #333; margin-bottom: 15px; font-size: 16px; border-bottom: 1px solid #ddd; padding-bottom: 5px; overflow-wrap: break-word; word-wrap: break-word; }
          .sidebar .link-item { margin-bottom: 15px; }
          .sidebar .link-item a { color: #0d6efd; text-decoration: none; font-weight: 600; display: block; margin-bottom: 3px; overflow-wrap: break-word; word-wrap: break-word; }
          .sidebar .link-item p { font-size: 13px; color: #666; margin: 0; line-height: 1.4; overflow-wrap: break-word; word-wrap: break-word; }
          .divider { border-top: 1px solid #ddd; margin: 20px 0; }
          .video-section .video-image { width: 100%; height: auto; border-radius: 8px; margin-bottom: 10px; }
          .video-section .video-summary { font-size: 13px; color: #666; line-height: 1.4; overflow-wrap: break-word; word-wrap: break-word; }
          .footer { padding: 20px; text-align: center; background-color: #f7f7f7; color: #777; font-size: 12px; border-top: 1px solid #dddddd; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="navbar">
            <img src="/transparent-logo.png" alt="Logo" class="logo">
            <div class="nav-links">
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div class="banner">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=200&width=800&query=abstract-tech-banner-for-${title.replace(/\s+/g, "-")}" alt="Banner for ${title}">
          </div>
          <div class="main-content-wrapper">
            <div class="content">
              <h1>${title}</h1>
              <!-- MAIN_CONTENT_SECTIONS_HERE -->
            </div>
            <div class="sidebar">
              <h3>Helpful Links</h3>
              <!-- HELPFUL_LINKS_HERE -->
              <div class="divider"></div>
              <div class="video-section">
                <h3>Watch Video</h3>
                <!-- WATCH_VIDEO_SECTION_HERE -->
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Newsletter SaaS Inc. &copy; 2024</p>
            <p><a href="{{unsubscribe_url}}">Unsubscribe</a> | <a href="{{view_in_browser_url}}">View in browser</a></p>
          </div>
        </div>
        {{tracking_pixel}}
      </body>
      </html>
      \`\`\`
      `,
    })

    // Generate a unique newsletter ID
    const newsletterId = `newsletter_${Date.now()}`

    return {
      html: text,
      newsletterId,
    }
  } catch (error) {
    console.error("Error generating newsletter:", error)
    throw new Error("Failed to generate newsletter")
  }
}
