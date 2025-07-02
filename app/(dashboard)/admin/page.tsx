"use client"

import { useState, useActionState, useEffect } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Mail, Shield, Users, MoreHorizontal, Ban } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { inviteUser, updateUserRole, deactivateUser, type InviteFormState, type UserFormState } from "./actions"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { User } from "@/lib/types"

const initialInviteState: InviteFormState = {
  message: "",
  status: "idle",
}

const initialUserState: UserFormState = {
  message: "",
  status: "idle",
}

// Mock data for existing users
const mockUsers: (User & { status: "active" | "inactive" | "pending" })[] = [
  {
    id: "1",
    email: "admin@example.com",
    firstName: "John",
    lastName: "Admin",
    role: "ADMIN",
    created_at: "2024-06-01T10:00:00Z",
    status: "active",
  },
  {
    id: "2",
    email: "editor@example.com",
    firstName: "Jane",
    lastName: "Editor",
    role: "EDITOR",
    created_at: "2024-06-15T14:30:00Z",
    status: "active",
  },
  {
    id: "3",
    email: "pending@example.com",
    firstName: "Sam",
    lastName: "Pending",
    role: "EDITOR",
    created_at: "2024-06-28T09:15:00Z",
    status: "pending",
  },
]

// Mock data for pending invitations
const mockInvitations = [
  {
    id: "inv_1",
    email: "newuser@example.com",
    firstName: "New",
    lastName: "User",
    role: "EDITOR",
    sent_at: "2024-06-29T16:00:00Z",
    expires_at: "2024-07-06T16:00:00Z",
  },
  {
    id: "inv_2",
    email: "designer@example.com",
    firstName: "Design",
    lastName: "Lead",
    role: "EDITOR",
    sent_at: "2024-06-30T10:30:00Z",
    expires_at: "2024-07-07T10:30:00Z",
  },
]

export default function AdminPage() {
  const { toast } = useToast()
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [inviteState, inviteAction, isInvitePending] = useActionState(inviteUser, initialInviteState)
  const [userState, userAction, isUserPending] = useActionState(updateUserRole, initialUserState)

  useEffect(() => {
    if (inviteState.status === "success") {
      toast({ title: "Success!", description: inviteState.message })
      setIsInviteDialogOpen(false)
    } else if (inviteState.status === "error") {
      toast({ title: "Error", description: inviteState.message, variant: "destructive" })
    }
  }, [inviteState, toast])

  useEffect(() => {
    if (userState.status === "success") {
      toast({ title: "Success!", description: userState.message })
    } else if (userState.status === "error") {
      toast({ title: "Error", description: userState.message, variant: "destructive" })
    }
  }, [userState, toast])

  const handleDeactivateUser = async (userId: string) => {
    const result = await deactivateUser(userId)
    if (result.success) {
      toast({ title: "Success!", description: result.message })
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" })
    }
  }

  const getRoleBadge = (role: string) => {
    return role === "ADMIN" ? "default" : "secondary"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "inactive":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground">Manage users, roles, and system access.</p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="invitations">
            <Mail className="mr-2 h-4 w-4" />
            Invitations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage existing users and their permissions.</CardDescription>
              </div>
              <Button onClick={() => setIsInviteDialogOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite User
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{`${user.firstName} ${user.lastName}`}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadge(user.role)}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(user.status)}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeactivateUser(user.id)}
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitations">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>Track and manage sent invitations.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInvitations.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell className="font-medium">{`${invitation.firstName} ${invitation.lastName}`}</TableCell>
                      <TableCell>{invitation.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadge(invitation.role)}>{invitation.role}</Badge>
                      </TableCell>
                      <TableCell>{new Date(invitation.sent_at).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(invitation.expires_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Resend
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {mockInvitations.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No pending invitations.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Invite User Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New User</DialogTitle>
            <DialogDescription>Send an invitation email with account setup instructions.</DialogDescription>
          </DialogHeader>
          <form action={inviteAction}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EDITOR">Editor</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isInvitePending}>
                {isInvitePending ? "Sending..." : "Send Invitation"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
