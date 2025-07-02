"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, TrendingUp, Mail, Forward, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const AccentIcon = ({ icon: Icon, color }: { icon: React.ElementType; color: "blue" | "green" | "yellow" }) => {
  return (
    <div
      className={cn(
        "p-2 rounded-lg",
        color === "blue" && "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300",
        color === "green" && "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300",
        color === "yellow" && "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-300",
      )}
    >
      <Icon className="h-5 w-5" />
    </div>
  )
}

const TypewriterText = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed])

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero Banner */}
      <div
        className="relative h-64 rounded-lg overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/abstract-blue-purple-gradient.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
            <TypewriterText text="Send Emails That People Will Read" speed={80} />
          </h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <AccentIcon icon={Users} color="blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +180.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
            <AccentIcon icon={Eye} color="green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.5%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +19% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Forward Rate</CardTitle>
            <AccentIcon icon={Forward} color="yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Newsletters Sent</CardTitle>
            <AccentIcon icon={Mail} color="blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>A log of recent newsletter sends and subscriber activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "The Future of Serverless", status: "SENT", opens: 1256 },
              { title: "Glassmorphism is Back", status: "DRAFT", opens: 0 },
              { title: "Building Growth Loops", status: "SCHEDULED", opens: 0 },
            ].map((newsletter, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{newsletter.title}</p>
                    <p className="text-sm text-muted-foreground">{newsletter.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{newsletter.opens.toLocaleString()} opens</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
