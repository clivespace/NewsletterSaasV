import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirect directly to the dashboard instead of login
  redirect("/dashboard")
}
