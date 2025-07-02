"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wand2 } from "lucide-react"
import { useState } from "react"
import { useCompletion } from "ai/react"
import { useRouter } from "next/navigation"

export default function NewNewsletterPage() {
  const [keywords, setKeywords] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<{ title: string; hook: string } | null>(null)
  const [draft, setDraft] = useState<{ subject: string; html: string; text: string } | null>(null)
  const [isDrafting, setIsDrafting] = useState(false)
  const router = useRouter()

  const {
    completion,
    complete,
    isLoading: isLoadingTopics,
  } = useCompletion({
    api: "/api/ai/topics",
  })

  const handleGenerateTopics = async (e: React.FormEvent) => {
    e.preventDefault()
    setDraft(null)
    setSelectedTopic(null)
    complete(keywords)
  }

  const handleGenerateDraft = async (title: string, hook: string) => {
    setSelectedTopic({ title, hook })
    setIsDrafting(true)
    try {
      const response = await fetch("/api/ai/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, audience: "tech enthusiasts and developers" }),
      })
      const draftData = await response.json()
      setDraft(draftData)
    } catch (error) {
      console.error("Failed to generate draft:", error)
    } finally {
      setIsDrafting(false)
    }
  }

  const parseTopics = (text: string) => {
    return text
      .split(/\d\.\s\*\*/)
      .filter(Boolean)
      .map((part) => {
        const [title, hook] = part.split(/\*\*\s-\sHook:\s/)
        return { title: title?.trim(), hook: hook?.trim() }
      })
  }

  const topics = completion ? parseTopics(completion) : []

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="glass">
        <CardHeader>
          <CardTitle>1. Brainstorm Topics</CardTitle>
          <CardDescription>Generate ideas with AI based on keywords.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerateTopics} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                placeholder="e.g., serverless, react, design trends"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isLoadingTopics}>
              <Wand2 className="mr-2 h-4 w-4" />
              {isLoadingTopics ? "Generating..." : "Generate Ideas"}
            </Button>
          </form>
          {completion && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Generated Ideas</h3>
              {topics.map((idea, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedTopic?.title === idea.title ? "ring-2 ring-primary bg-primary/10" : "bg-background/50"
                  }`}
                  onClick={() => handleGenerateDraft(idea.title, idea.hook)}
                >
                  <p className="font-bold">{idea.title}</p>
                  <p className="text-sm text-muted-foreground">{idea.hook}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="glass">
        <CardHeader>
          <CardTitle>2. Draft with AI</CardTitle>
          <CardDescription>Select a topic and let AI write the first draft.</CardDescription>
        </CardHeader>
        <CardContent>
          {isDrafting && <p>Generating draft...</p>}
          {draft ? (
            <div className="space-y-4">
              <h3 className="font-bold">{draft.subject}</h3>
              <div
                className="prose prose-sm dark:prose-invert p-4 border rounded-lg bg-background/50 max-h-60 overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: draft.html }}
              />
              <Button onClick={() => router.push("/builder/mock-id")}>Continue in Builder &rarr;</Button>
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Select a topic to generate a draft.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
