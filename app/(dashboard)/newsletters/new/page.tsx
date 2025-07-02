"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ArrowRight, BookOpen, Brush, Code, Cpu, Loader2, PenTool, Plus, Sparkles, Wand2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { generateNewsletterDraft, generateTopics, type Topic } from "./actions"

const initialTopics: Topic[] = [
  {
    id: "default_1",
    title: "The Rise of Serverless Architecture",
    description: "Exploring the benefits and challenges of serverless computing.",
    category: "Technology",
  },
  {
    id: "default_2",
    title: "Micro-Frontends: The Future of Web Development",
    description: "Breaking down monolithic frontends into manageable pieces.",
    category: "Architecture",
  },
  {
    id: "default_3",
    title: "Designing for Accessibility",
    description: "Creating inclusive web experiences for all users.",
    category: "Design",
  },
  {
    id: "default_4",
    title: "Mastering Asynchronous JavaScript",
    description: "A deep dive into Promises, async/await, and modern patterns.",
    category: "Engineering",
  },
]

const categoryIcons: { [key: string]: React.ElementType } = {
  Technology: Cpu,
  Architecture: PenTool,
  Design: Brush,
  Engineering: Code,
  Default: Sparkles,
}

export default function NewNewsletterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isPendingTopics, startTopicsTransition] = useTransition()
  const [isPendingDraft, startDraftTransition] = useTransition()

  const [allTopics, setAllTopics] = useState<Topic[]>(initialTopics)
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["default_1", "default_2", "default_3", "default_4"])
  const [keywords, setKeywords] = useState("")
  const [newsletterTitle, setNewsletterTitle] = useState("Weekly Tech Digest")
  const [generatedDraft, setGeneratedDraft] = useState<{
    id: string
    html: string
  } | null>(null)

  const handleTopicSelection = (topicId: string) => {
    setSelectedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const handleGenerateTopics = () => {
    startTopicsTransition(async () => {
      try {
        const newTopics = await generateTopics(keywords)
        setAllTopics((prev) => [...prev, ...newTopics])
        // Automatically select newly generated topics
        setSelectedTopics((prev) => [...prev, ...newTopics.map((t) => t.id)])
        setKeywords("")
        toast({
          title: "Topics Generated!",
          description: "New topics have been added to the list.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to generate topics. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  const handleGenerateDraft = () => {
    const topicsToInclude = allTopics.filter((t) => selectedTopics.includes(t.id))
    if (topicsToInclude.length === 0) {
      toast({
        title: "No Topics Selected",
        description: "Please select at least one topic to generate a newsletter.",
        variant: "destructive",
      })
      return
    }

    startDraftTransition(async () => {
      try {
        const result = await generateNewsletterDraft(newsletterTitle, topicsToInclude)
        setGeneratedDraft({ id: result.newsletterId, html: result.html })
        toast({
          title: "Draft Generated!",
          description: "Your newsletter draft is ready for preview.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to generate draft. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  if (generatedDraft) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Newsletter Preview</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setGeneratedDraft(null)}>
                  Back to Topics
                </Button>
                <Button onClick={() => router.push(`/builder/${generatedDraft.id}`)}>
                  Edit in Builder <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <iframe srcDoc={generatedDraft.html} className="w-full h-[70vh]" title="Newsletter Preview" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-3 h-6 w-6 text-primary" />
                Select Topics for Your Newsletter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label htmlFor="newsletter-title">Newsletter Title</Label>
                <Input
                  id="newsletter-title"
                  value={newsletterTitle}
                  onChange={(e) => setNewsletterTitle(e.target.value)}
                  className="text-lg font-semibold"
                />
              </div>
              <div className="space-y-4">
                {allTopics.map((topic) => {
                  const Icon = categoryIcons[topic.category] || categoryIcons.Default
                  return (
                    <div
                      key={topic.id}
                      className={`p-4 border rounded-lg transition-all ${
                        selectedTopics.includes(topic.id) ? "bg-primary/10 border-primary" : "bg-white"
                      }`}
                    >
                      <div className="flex items-start">
                        <Checkbox
                          id={`topic-${topic.id}`}
                          checked={selectedTopics.includes(topic.id)}
                          onCheckedChange={() => handleTopicSelection(topic.id)}
                          className="mr-4 mt-1"
                        />
                        <div className="flex-grow">
                          <Label htmlFor={`topic-${topic.id}`} className="flex items-center mb-1">
                            <Icon className="mr-2 h-5 w-5 text-muted-foreground" />
                            <span className="font-bold text-base">{topic.title}</span>
                          </Label>
                          <p className="text-sm text-muted-foreground ml-7">{topic.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Button
                onClick={handleGenerateDraft}
                disabled={isPendingDraft || selectedTopics.length === 0}
                className="mt-8 w-full text-lg py-6"
              >
                {isPendingDraft ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-5 w-5" />
                )}
                Generate Newsletter Draft
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-3 h-6 w-6 text-primary" />
                Generate New Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Textarea
                    id="keywords"
                    placeholder="e.g., AI in frontend, React performance"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleGenerateTopics}
                  disabled={isPendingTopics || !keywords.trim()}
                  className="w-full"
                >
                  {isPendingTopics ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Generate Topics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
