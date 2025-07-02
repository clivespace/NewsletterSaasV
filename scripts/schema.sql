-- Enable pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- users: Stores user accounts, roles determine permissions
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  name        TEXT,
  "password"  TEXT, -- For credentials provider
  role        TEXT NOT NULL DEFAULT 'EDITOR', -- 'ADMIN' or 'EDITOR'
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- newsletters: Core table for email campaigns
CREATE TABLE IF NOT EXISTS newsletters (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'DRAFT', -- DRAFT | SCHEDULED | SENT
  subject     TEXT,
  html_content TEXT,
  text_content TEXT,
  sent_at     TIMESTAMP WITH TIME ZONE,
  opens       INT DEFAULT 0,
  forwards    INT DEFAULT 0,
  author_id   UUID REFERENCES users(id),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- subscribers: The mailing list
CREATE TABLE IF NOT EXISTS subscribers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  joined_at   TIMESTAMP WITH TIME ZONE DEFAULT now(),
  opens       INT DEFAULT 0,
  forwards    INT DEFAULT 0
);

-- audience_groups: Stores groups for segmenting subscribers
CREATE TABLE IF NOT EXISTS audience_groups (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- subscriber_groups: Many-to-many relationship between subscribers and groups
CREATE TABLE IF NOT EXISTS subscriber_groups (
  subscriber_id UUID REFERENCES subscribers(id) ON DELETE CASCADE,
  group_id      UUID REFERENCES audience_groups(id) ON DELETE CASCADE,
  PRIMARY KEY (subscriber_id, group_id)
);


-- forward_invites: Tracks tokens for the growth loop
CREATE TABLE IF NOT EXISTS forward_invites (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id UUID REFERENCES subscribers(id),
  newsletter_id UUID REFERENCES newsletters(id),
  token         TEXT UNIQUE NOT NULL,
  used          BOOLEAN DEFAULT false,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- accounts: For NextAuth.js OAuth providers
CREATE TABLE IF NOT EXISTS accounts (
    "userId" UUID NOT NULL,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    CONSTRAINT "accounts_pkey" PRIMARY KEY ("provider", "providerAccountId")
);

-- sessions: For NextAuth.js session management
CREATE TABLE IF NOT EXISTS sessions (
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    CONSTRAINT "sessions_pkey" PRIMARY KEY ("sessionToken")
);

-- verification_tokens: For NextAuth.js email verification
CREATE TABLE IF NOT EXISTS verification_tokens (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY (identifier, token)
);
