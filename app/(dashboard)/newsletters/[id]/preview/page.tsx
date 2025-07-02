"use client"

import { mockNewsletters } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Edit, Send } from "lucide-react"
import { notFound } from "next/navigation"

export default function NewsletterPreviewPage({ params }: { params: { id: string } }) {
  const newsletter = mockNewsletters.find((n) => n.id === params.id)

  if (!newsletter) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/newsletters">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Newsletters
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/builder/${newsletter.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{newsletter.title}</CardTitle>
          <CardDescription>
            Status: {newsletter.status} | Opens: {newsletter.opens} | Forwards: {newsletter.forwards}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 p-4 border rounded-lg bg-white max-h-[70vh] overflow-y-auto">
            <div dangerouslySetInnerHTML={{ __html: newsletter.htmlContent }} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
