"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { mockNewsletters } from "@/lib/mock-data" // Import from the new central file

export default function NewslettersPage() {
  const router = useRouter()

  const handleRowClick = (newsletterId: string) => {
    router.push(`/newsletters/${newsletterId}/preview`)
  }

  return (
    <Card className="glass">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Newsletters</CardTitle>
            <CardDescription>
              Manage your drafts, scheduled, and sent campaigns. Click a row to preview.
            </CardDescription>
          </div>
          <Button asChild>
            <Link href="/newsletters/new">
              <PlusCircle className="mr-2 h-4 w-4" /> New Newsletter
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent Date</TableHead>
              <TableHead className="text-right">Opens</TableHead>
              <TableHead className="text-right">Forwards</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockNewsletters.map((newsletter) => (
              <TableRow
                key={newsletter.id}
                onClick={() => handleRowClick(newsletter.id)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium">{newsletter.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      newsletter.status === "SENT" ? "default" : newsletter.status === "DRAFT" ? "secondary" : "outline"
                    }
                    className={cn(
                      newsletter.status === "SENT" && "bg-green-500 text-white",
                      newsletter.status === "SCHEDULED" && "bg-yellow-500 text-black",
                    )}
                  >
                    {newsletter.status}
                  </Badge>
                </TableCell>
                <TableCell>{newsletter.sent_at ? new Date(newsletter.sent_at).toLocaleDateString() : "—"}</TableCell>
                <TableCell className="text-right">{newsletter.opens.toLocaleString()}</TableCell>
                <TableCell className="text-right">{newsletter.forwards.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
