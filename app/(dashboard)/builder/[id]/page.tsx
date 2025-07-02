"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Blocks, Eye, Send } from "lucide-react"
import { motion } from "framer-motion"
import { useActionState, useEffect, useState } from "react"
import { sendNewsletter, type FormState } from "./actions"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import type { AudienceGroup } from "@/lib/types"
import Link from "next/link"

const initialState: FormState = {
  message: "",
  status: "idle",
}

// Mock data for audience groups - updated to match the AudienceGroup type
const mockAudienceGroups: AudienceGroup[] = [
  {
    id: "g1",
    name: "Engaged Readers",
    subscriber_count: 2,
    created_at: "2024-06-20T10:00:00Z",
    creator_name: "Admin User",
  },
  {
    id: "g2",
    name: "VIPs",
    subscriber_count: 1,
    created_at: "2024-06-22T11:00:00Z",
    creator_name: "Editor User",
  },
]

export default function BuilderPage({ params }: { params: { id: string } }) {
  const [state, formAction, isPending] = useActionState(sendNewsletter, initialState)
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState("")
  const [progress, setProgress] = useState(0)

  const mockHtmlContent = `<h1>Hello from Newsletter SaaS!</h1><p>This is your awesome newsletter content.</p>{{tracking_pixel}}`

  useEffect(() => {
    if (state.status === "success") {
      toast({ title: "Success!", description: state.message })
      setIsDialogOpen(false)
    } else if (state.status === "error") {
      toast({ title: "Error", description: state.message, variant: "destructive" })
    }
  }, [state, toast])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPending && state.totalSubscribers) {
      const totalDuration = state.totalSubscribers * 120 // 120ms per email
      const interval = totalDuration / 100
      setProgress(0)
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer)
            return 100
          }
          return prev + 1
        })
      }, interval)
    }
    return () => clearInterval(timer)
  }, [isPending, state.totalSubscribers])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 h-[calc(100vh-100px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" asChild>
            <Link href="/newsletters">← Back to Newsletters</Link>
          </Button>
          <h1 className="text-2xl font-bold">Email Builder</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Send className="mr-2 h-4 w-4" /> Send
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form action={formAction}>
                  <DialogHeader>
                    <DialogTitle>Send Newsletter</DialogTitle>
                    <DialogDescription>Select an audience group to send this campaign to.</DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <input type="hidden" name="newsletterId" value={params.id} />
                    <input type="hidden" name="htmlContent" value={mockHtmlContent} />
                    <div className="space-y-2">
                      <Label htmlFor="audienceGroup">Audience Group</Label>
                      <Select name="groupId" required onValueChange={setSelectedGroup}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a group" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockAudienceGroups.map((group) => (
                            <SelectItem key={group.id} value={group.id}>
                              {group.name} ({group.subscriber_count} members)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {isPending && state.totalSubscribers && (
                      <div className="space-y-2">
                        <Label>Sending...</Label>
                        <Progress value={progress} />
                        <p className="text-sm text-muted-foreground text-center">
                          {Math.round((progress / 100) * state.totalSubscribers)} of {state.totalSubscribers} emails
                          sent
                        </p>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isPending || !selectedGroup}>
                      {isPending ? "Sending..." : "Confirm & Send"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Card className="glass flex-grow">
          <CardContent className="p-6 h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground w-full max-w-lg">
              <p className="text-lg">Email Canvas Area</p>
              <p className="text-sm">(GrapesJS or MJML editor would be rendered here)</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-4"
      >
        <Card className="glass">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 flex items-center">
              <Blocks className="mr-2 h-5 w-5" />
              Component Palette
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {["Text", "Image", "Button", "Spacer", "Columns"].map((block) => (
                <div
                  key={block}
                  className="p-4 border rounded-lg text-center cursor-grab bg-background/50 hover:bg-primary/10 transition-colors"
                >
                  {block}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="glass flex-grow">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Settings</h3>
            <p className="text-sm text-muted-foreground">
              Component-specific settings would appear here when an element is selected.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
