"use server"

import { revalidatePath } from "next/cache"
import { randomBytes } from "crypto"

export type InviteFormState = {
  message: string
  status: "success" | "error" | "idle"
}

export type UserFormState = {
  message: string
  status: "success" | "error" | "idle"
}

// Mock function to send invitation email
async function sendInvitationEmail(email: string, inviteToken: string, role: string) {
  // In a real app, this would send an actual email
  console.log(`[EMAIL] Sending invitation to ${email}`)
  console.log(`[EMAIL] Role: ${role}`)
  console.log(
    `[EMAIL] Invite link: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/invite/${inviteToken}`,
  )

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 500))
}

export async function inviteUser(prevState: InviteFormState, formData: FormData): Promise<InviteFormState> {
  const email = formData.get("email") as string
  const role = formData.get("role") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  if (!email || !role || !firstName || !lastName) {
    return { message: "All fields are required.", status: "error" }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { message: "Please enter a valid email address.", status: "error" }
  }

  try {
    // Generate invitation token
    const inviteToken = randomBytes(32).toString("hex")

    // In a real app, you would:
    // 1. Check if user already exists
    // 2. Create a pending invitation record in the database
    // 3. Send the invitation email

    console.log(`[DB] Creating invitation for ${firstName} ${lastName} (${email}) with role ${role}`)
    console.log(`[DB] Invitation token: ${inviteToken}`)

    // Send invitation email
    await sendInvitationEmail(email, inviteToken, role)

    revalidatePath("/admin")

    return {
      message: `Invitation sent successfully to ${email}. They will receive an email with setup instructions.`,
      status: "success",
    }
  } catch (error) {
    console.error("Failed to send invitation:", error)
    return { message: "Failed to send invitation. Please try again.", status: "error" }
  }
}

export async function updateUserRole(prevState: UserFormState, formData: FormData): Promise<UserFormState> {
  const userId = formData.get("userId") as string
  const newRole = formData.get("role") as string

  if (!userId || !newRole) {
    return { message: "User ID and role are required.", status: "error" }
  }

  try {
    // In a real app, you would update the user's role in the database
    console.log(`[DB] Updating user ${userId} role to ${newRole}`)

    revalidatePath("/admin")

    return {
      message: "User role updated successfully.",
      status: "success",
    }
  } catch (error) {
    console.error("Failed to update user role:", error)
    return { message: "Failed to update user role. Please try again.", status: "error" }
  }
}

export async function deactivateUser(userId: string): Promise<{ success: boolean; message: string }> {
  try {
    // In a real app, you would deactivate the user in the database
    console.log(`[DB] Deactivating user ${userId}`)

    revalidatePath("/admin")

    return {
      success: true,
      message: "User deactivated successfully.",
    }
  } catch (error) {
    console.error("Failed to deactivate user:", error)
    return {
      success: false,
      message: "Failed to deactivate user. Please try again.",
    }
  }
}
