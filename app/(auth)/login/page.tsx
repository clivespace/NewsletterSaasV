import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-sky-500/10">
      <Card className="w-full max-w-sm glass">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to manage your newsletters</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              "use server"
              await signIn("credentials", formData)
            }}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          {/* The OAuth login options have been temporarily removed to fix the client-side error. */}
        </CardContent>
      </Card>
    </main>
  )
}
