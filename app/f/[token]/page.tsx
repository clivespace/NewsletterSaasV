import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { submitForwardedEmail } from "./actions"

// This is the public-facing page for the growth loop.
// A user lands here after clicking a forwarded email link.
export default function ForwardPage({ params }: { params: { token: string } }) {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-sky-500/10">
      <Card className="w-full max-w-md glass">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">You're Invited!</CardTitle>
          <CardDescription>Join the newsletter to get content like this delivered to your inbox.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={submitForwardedEmail} className="grid gap-4">
            <input type="hidden" name="token" value={params.token} />
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <Button type="submit" className="w-full">
              Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
