// These types provide IntelliSense and type-checking for your database queries.
// They are manually defined to match your SQL schema.

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role: "ADMIN" | "EDITOR"
  created_at: string
}

export interface Newsletter {
  id: string
  title: string
  status: "DRAFT" | "SCHEDULED" | "SENT"
  subject?: string
  html_content?: string
  text_content?: string
  sent_at?: string
  opens: number
  forwards: number
  author_id: string
  created_at: string
}

export interface Subscriber {
  id: string
  email: string
  joined_at: string
  opens: number
  forwards: number
  groups?: AudienceGroup[]
}

export interface AudienceGroup {
  id: string
  name: string
  subscriber_count: number
  created_at: string
  creator_name: string
}

export interface ForwardInvite {
  id: string
  subscriber_id: string
  newsletter_id: string
  token: string
  used: boolean
  created_at: string
}
