"use client"
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
import { ArrowLeft, PlusCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { Subscriber, AudienceGroup } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Extended subscriber type with analytics
interface SubscriberWithAnalytics extends Subscriber {
  emails_sent: number
  emails_opened: number
  open_rate: number
}

// Mock data - in a real app, this would come from your database
const mockGroups: AudienceGroup[] = [
  {
    id: "g1",
    name: "Engaged Readers",
    subscriber_count: 2,
    created_at: "2024-06-20T10:00:00Z",
    creator_name: "John Admin",
  },
  { id: "g2", name: "VIPs", subscriber_count: 1, created_at: "2024-06-22T11:00:00Z", creator_name: "Jane Editor" },
]

const mockSubscribersWithAnalytics: SubscriberWithAnalytics[] = [
  {
    id: "1",
    email: "reader1@example.com",
    joined_at: "2024-06-15T10:00:00Z",
    opens: 12,
    forwards: 2,
    emails_sent: 15,
    emails_opened: 12,
    open_rate: 80, // 12/15 * 100 = 80%
  },
  {
    id: "2",
    email: "fan@example.com",
    joined_at: "2024-06-10T11:30:00Z",
    opens: 18,
    forwards: 5,
    emails_sent: 20,
    emails_opened: 18,
    open_rate: 90, // 18/20 * 100 = 90%
  },
  {
    id: "3",
    email: "newbie@example.com",
    joined_at: "2024-06-28T14:00:00Z",
    opens: 1,
    forwards: 0,
    emails_sent: 3,
    emails_opened: 1,
    open_rate: 33, // 1/3 * 100 = 33%
  },
  {
    id: "4",
    email: "vip@example.com",
    joined_at: "2024-05-01T09:00:00Z",
    opens: 23,
    forwards: 10,
    emails_sent: 25,
    emails_opened: 23,
    open_rate: 92, // 23/25 * 100 = 92%
  },
  {
    id: "5",
    email: "prospect@example.com",
    joined_at: "2024-07-01T12:00:00Z",
    opens: 0,
    forwards: 0,
    emails_sent: 2,
    emails_opened: 0,
    open_rate: 0, // 0/2 * 100 = 0%
  },
]

const mockSubscriberGroups = [
  { subscriber_id: "2", group_id: "g1" },
  { subscriber_id: "4", group_id: "g1" },
  { subscriber_id: "4", group_id: "g2" },
]

const calculateOpenRate = (emailsOpened: number, emailsSent: number): number => {
  if (emailsSent === 0) return 0
  return Math.round((emailsOpened / emailsSent) * 100)
}

export default function GroupDetailPage({ params }: { params: { groupId: string } }) {
  const { toast } = useToast()
  const [subscriberGroups, setSubscriberGroups] = useState(mockSubscriberGroups)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [selectedSubscribers, setSelectedSubscribers] = useState<Set<string>>(new Set())

  const group = mockGroups.find((g) => g.id === params.groupId)

  const membersOfGroup = useMemo(() => {
    if (!group) return []
    const memberIds = subscriberGroups.filter((sg) => sg.group_id === group.id).map((sg) => sg.subscriber_id)
    return mockSubscribersWithAnalytics.filter((s) => memberIds.includes(s.id))
  }, [group, subscriberGroups])

  const subscribersNotInGroup = useMemo(() => {
    if (!group) return []
    const memberIds = subscriberGroups.filter((sg) => sg.group_id === group.id).map((sg) => sg.subscriber_id)
    return mockSubscribersWithAnalytics.filter((s) => !memberIds.includes(s.id))
  }, [group, subscriberGroups])

  const handleAddMembersToGroup = () => {
    if (!group) return
    const newJoins = Array.from(selectedSubscribers).map((subscriber_id) => ({
      subscriber_id,
      group_id: group.id,
    }))
    const uniqueNewJoins = newJoins.filter(
      (join) =>
        !subscriberGroups.some((sg) => sg.subscriber_id === join.subscriber_id && sg.group_id === join.group_id),
    )
    setSubscriberGroups([...subscriberGroups, ...uniqueNewJoins])
    toast({
      title: "Success!",
      description: `${uniqueNewJoins.length} members added to "${group.name}".`,
    })
    setIsAddMemberDialogOpen(false)
    setSelectedSubscribers(new Set())
  }

  const getOpenRateBadge = (rate: number) => {
    if (rate >= 80) return "default"
    if (rate >= 50) return "secondary"
    return "destructive"
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/audience">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Groups
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{group ? group.name : "Group not found"}</h1>
              <p className="text-muted-foreground">
                {membersOfGroup.length} members • Created by {group?.creator_name}
              </p>
            </div>
          </div>
          <Button onClick={() => setIsAddMemberDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Members
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Group Members</CardTitle>
            <CardDescription>Detailed analytics for each member in this group.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email Address</TableHead>
                  <TableHead className="text-center">Emails Sent</TableHead>
                  <TableHead className="text-center">Emails Opened</TableHead>
                  <TableHead className="text-center">Forwards</TableHead>
                  <TableHead className="text-center">Open Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {membersOfGroup.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.email}</TableCell>
                    <TableCell className="text-center">{member.emails_sent}</TableCell>
                    <TableCell className="text-center">{member.emails_opened}</TableCell>
                    <TableCell className="text-center">{member.forwards}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getOpenRateBadge(calculateOpenRate(member.emails_opened, member.emails_sent))}>
                        {calculateOpenRate(member.emails_opened, member.emails_sent)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {membersOfGroup.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No members in this group yet. Click "Add Members" to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add Members Dialog */}
      <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Members to "{group ? group.name : ""}"</DialogTitle>
            <DialogDescription>Select subscribers to add to this group.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      onCheckedChange={(checked) => {
                        const newSelected = new Set<string>()
                        if (checked) {
                          subscribersNotInGroup.forEach((s) => newSelected.add(s.id))
                        }
                        setSelectedSubscribers(newSelected)
                      }}
                    />
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Open Rate</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribersNotInGroup.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedSubscribers.has(sub.id)}
                        onCheckedChange={(checked) => {
                          const newSelected = new Set(selectedSubscribers)
                          if (checked) {
                            newSelected.add(sub.id)
                          } else {
                            newSelected.delete(sub.id)
                          }
                          setSelectedSubscribers(newSelected)
                        }}
                      />
                    </TableCell>
                    <TableCell>{sub.email}</TableCell>
                    <TableCell>
                      <Badge variant={getOpenRateBadge(sub.open_rate)}>{sub.open_rate}%</Badge>
                    </TableCell>
                    <TableCell>{new Date(sub.joined_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
                {subscribersNotInGroup.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-4">
                      All subscribers are already in this group.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button onClick={handleAddMembersToGroup} disabled={selectedSubscribers.size === 0}>
              Add {selectedSubscribers.size} Members
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
