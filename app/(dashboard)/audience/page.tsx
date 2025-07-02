"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { AudienceGroup } from "@/lib/types"
import Link from "next/link"

// Initial mock data
const initialGroups: AudienceGroup[] = [
  {
    id: "g1",
    name: "Engaged Readers",
    subscriber_count: 2,
    created_at: "2024-06-20T10:00:00Z",
    creator_name: "John Admin",
  },
  { id: "g2", name: "VIPs", subscriber_count: 1, created_at: "2024-06-22T11:00:00Z", creator_name: "Jane Editor" },
]

const initialSubscriberGroups = [
  { subscriber_id: "2", group_id: "g1" },
  { subscriber_id: "4", group_id: "g1" },
  { subscriber_id: "4", group_id: "g2" },
]

export default function AudiencePage() {
  const [groups, setGroups] = useState<AudienceGroup[]>(initialGroups)
  const [subscriberGroups] = useState(initialSubscriberGroups)
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)
  const { toast } = useToast()

  const groupsWithCounts = useMemo(() => {
    return groups.map((g) => ({
      ...g,
      subscriber_count: subscriberGroups.filter((sg) => sg.group_id === g.id).length,
    }))
  }, [groups, subscriberGroups])

  const handleGroupFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get("groupName") as string

    if (!name) {
      toast({ title: "Error", description: "Group name cannot be empty.", variant: "destructive" })
      return
    }

    if (groups.some((g) => g.name === name)) {
      toast({ title: "Error", description: "A group with this name already exists.", variant: "destructive" })
      return
    }

    const newGroup: AudienceGroup = {
      id: `g${Date.now()}`,
      name,
      subscriber_count: 0,
      created_at: new Date().toISOString(),
      creator_name: "John Admin", // Assuming the current user is John Admin
    }
    setGroups([...groups, newGroup])
    toast({ title: "Success!", description: `Group "${name}" created.` })
    setIsGroupDialogOpen(false)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Audience Groups</CardTitle>
            <CardDescription>Create and manage segments of your audience for targeted campaigns.</CardDescription>
          </div>
          <Button onClick={() => setIsGroupDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Group
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Group Creator</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupsWithCounts.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>
                    <Link href={`/audience/${group.id}`} className="font-medium text-primary hover:underline">
                      {group.name}
                    </Link>
                  </TableCell>
                  <TableCell>{group.subscriber_count}</TableCell>
                  <TableCell>{new Date(group.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{group.creator_name}</TableCell>
                </TableRow>
              ))}
              {groupsWithCounts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No groups created yet. Click "New Group" to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Group Dialog */}
      <Dialog open={isGroupDialogOpen} onOpenChange={setIsGroupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription>Create a new audience segment for targeted campaigns.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleGroupFormSubmit}>
            <div className="grid gap-4 py-4">
              <Label htmlFor="groupName">Group Name</Label>
              <Input id="groupName" name="groupName" placeholder="e.g., Weekly Readers, VIP Customers" />
            </div>
            <DialogFooter>
              <Button type="submit">Create Group</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
