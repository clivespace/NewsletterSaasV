"use server"

import { revalidatePath } from "next/cache"
import { randomBytes } from "crypto"

// Mock data for subscribers and groups. In a real app, this would be a database query.
const mockSubscribers = [
  { id: "sub_1", email: "subscriber1@example.com" },
  { id: "sub_2", email: "subscriber2@example.com" },
  { id: "sub_3", email: "subscriber3@example.com" },
  { id: "sub_4", email: "vip@example.com" },
]
const mockGroups = {
  g1: ["sub_2", "sub_4"], // Engaged Readers
  g2: ["sub_4"], // VIPs
}

// This is the shape of the state that will be returned by the action for UI feedback.
export type FormState = {
  message: string
  status: "success" | "error" | "idle"
  totalSubscribers?: number
}

// The main server action for sending the newsletter.
export async function sendNewsletter(prevState: FormState, formData: FormData): Promise<FormState> {
  const newsletterId = formData.get("newsletterId") as string
  const htmlContent = formData.get("htmlContent") as string
  const groupId = formData.get("groupId") as string

  if (!newsletterId || !htmlContent || !groupId) {
    return { message: "Missing newsletter data or audience group.", status: "error" }
  }

  console.log(`--- Starting Send Process for Newsletter: ${newsletterId} to Group: ${groupId} ---`)

  // 1. Fetch subscribers for the selected group (mocked)
  // @ts-ignore
  const subscriberIds = mockGroups[groupId] || []
  const subscribers = mockSubscribers.filter((s) => subscriberIds.includes(s.id))

  if (subscribers.length === 0) {
    return { message: "Selected audience group has no subscribers.", status: "error" }
  }

  console.log(`[DB] Fetched ${subscribers.length} subscribers for group ${groupId}.`)

  // 2. Loop through subscribers and dispatch emails (mocked)
  for (const subscriber of subscribers) {
    const forwardToken = randomBytes(8).toString("hex")
    console.log(`[MAIL] Preparing email for ${subscriber.email} with token ${forwardToken}`)
    // Simulate network delay for each email
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  // 3. Update newsletter status to 'SENT' (mocked)
  console.log(`[DB] UPDATE newsletters SET status = 'SENT' WHERE id = '${newsletterId}'`)
  console.log(`--- Send Process Complete ---`)

  revalidatePath("/newsletters")
  revalidatePath("/dashboard")

  return {
    message: `Newsletter successfully dispatched to ${subscribers.length} subscribers.`,
    status: "success",
    totalSubscribers: subscribers.length,
  }
}
