"use server"

import { revalidatePath } from "next/cache"

// This server action handles the form submission from the forward page.
export async function submitForwardedEmail(formData: FormData) {
  const email = formData.get("email") as string
  const token = formData.get("token") as string

  if (!email || !token) {
    return { error: "Email and token are required." }
  }

  // --- Database Logic (Mocked) ---
  // In a real application, you would:
  // 1. Find the forward_invites record by the token.
  // 2. If it exists and hasn't been used:
  //    a. Add the new email to your `subscribers` table.
  //    b. Increment the `forwards` count on the original subscriber and the newsletter.
  //    c. Mark the token as used.
  console.log(`New subscription via forward token ${token}: ${email}`)
  // --- End of Mocked Logic ---

  revalidatePath("/audience") // To refresh the audience list if it were real.

  return { success: `Thank you for subscribing, ${email}!` }
}
