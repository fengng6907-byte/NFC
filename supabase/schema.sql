-- ============================================================
-- Gold Dutchy — Supabase PostgreSQL Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Users (extends Supabase auth.users) ─────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  name        TEXT,
  avatar_url  TEXT,
  currency    TEXT NOT NULL DEFAULT 'USD',
  points      INT  NOT NULL DEFAULT 0,
  streak_days INT  NOT NULL DEFAULT 0,
  last_settled_at TIMESTAMPTZ,
  total_settled   NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Groups ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.groups (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  description TEXT,
  emoji       TEXT NOT NULL DEFAULT '📁',
  type        TEXT NOT NULL DEFAULT 'OTHER'
                   CHECK (type IN ('TRIP','HOME','FRIENDS','BUSINESS','EVENT','OTHER')),
  color       TEXT NOT NULL DEFAULT '#F5B800',
  currency    TEXT NOT NULL DEFAULT 'USD',
  is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  created_by  UUID NOT NULL REFERENCES public.profiles(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Group Members ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.group_members (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id   UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role       TEXT NOT NULL DEFAULT 'MEMBER' CHECK (role IN ('ADMIN','MEMBER')),
  joined_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (group_id, user_id)
);

-- ── Expenses ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.expenses (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id     UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  payer_id     UUID NOT NULL REFERENCES public.profiles(id),
  title        TEXT NOT NULL,
  amount       NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  currency     TEXT NOT NULL DEFAULT 'USD',
  category     TEXT NOT NULL DEFAULT 'OTHER'
                    CHECK (category IN (
                      'FOOD','TRANSPORT','ACCOMMODATION','ENTERTAINMENT',
                      'SHOPPING','UTILITIES','HEALTH','TRAVEL','SPORTS',
                      'EDUCATION','OTHER'
                    )),
  split_method TEXT NOT NULL DEFAULT 'EQUAL'
                    CHECK (split_method IN ('EQUAL','PERCENTAGE','EXACT','SHARES')),
  notes        TEXT,
  receipt_url  TEXT,
  date         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_settled   BOOLEAN NOT NULL DEFAULT FALSE,
  is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
  recurrence   TEXT CHECK (recurrence IN ('WEEKLY','BIWEEKLY','MONTHLY') OR recurrence IS NULL),
  ai_category  TEXT,
  ai_confidence NUMERIC(3,2),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Expense Splits ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.expense_splits (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  expense_id  UUID NOT NULL REFERENCES public.expenses(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount      NUMERIC(12,2) NOT NULL,
  percent     NUMERIC(5,2),
  shares      INT,
  is_paid     BOOLEAN NOT NULL DEFAULT FALSE,
  paid_at     TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (expense_id, user_id)
);

-- ── Settlements ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.settlements (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id    UUID REFERENCES public.groups(id) ON DELETE SET NULL,
  sender_id   UUID NOT NULL REFERENCES public.profiles(id),
  receiver_id UUID NOT NULL REFERENCES public.profiles(id),
  amount      NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  currency    TEXT NOT NULL DEFAULT 'USD',
  method      TEXT NOT NULL DEFAULT 'CASH'
                   CHECK (method IN ('CASH','BANK_TRANSFER','PAYPAL','VENMO','OTHER')),
  status      TEXT NOT NULL DEFAULT 'PENDING'
                   CHECK (status IN ('PENDING','COMPLETED','CANCELLED')),
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  settled_at  TIMESTAMPTZ,
  CONSTRAINT no_self_settle CHECK (sender_id != receiver_id)
);

-- ── Notifications ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notifications (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type       TEXT NOT NULL CHECK (type IN (
               'EXPENSE_ADDED','SETTLEMENT_REQUESTED','SETTLEMENT_COMPLETED',
               'GROUP_INVITE','REMINDER','BADGE_EARNED'
             )),
  title      TEXT NOT NULL,
  message    TEXT NOT NULL,
  is_read    BOOLEAN NOT NULL DEFAULT FALSE,
  data       JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Badges ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.badges (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon        TEXT NOT NULL,
  color       TEXT NOT NULL DEFAULT '#F5B800',
  condition   TEXT NOT NULL,
  points      INT  NOT NULL DEFAULT 10
);

CREATE TABLE IF NOT EXISTS public.user_badges (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id  UUID NOT NULL REFERENCES public.badges(id),
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, badge_id)
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_group_members_user    ON public.group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_group_members_group   ON public.group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_expenses_group        ON public.expenses(group_id);
CREATE INDEX IF NOT EXISTS idx_expenses_payer        ON public.expenses(payer_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date         ON public.expenses(date DESC);
CREATE INDEX IF NOT EXISTS idx_expense_splits_exp    ON public.expense_splits(expense_id);
CREATE INDEX IF NOT EXISTS idx_expense_splits_user   ON public.expense_splits(user_id);
CREATE INDEX IF NOT EXISTS idx_settlements_sender    ON public.settlements(sender_id);
CREATE INDEX IF NOT EXISTS idx_settlements_receiver  ON public.settlements(receiver_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user    ON public.notifications(user_id, is_read);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated   BEFORE UPDATE ON public.profiles   FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_groups_updated     BEFORE UPDATE ON public.groups     FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_expenses_updated   BEFORE UPDATE ON public.expenses   FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- AUTO-CREATE PROFILE ON AUTH SIGNUP
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_splits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settlements   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges   ENABLE ROW LEVEL SECURITY;

-- Profiles: view all, edit own
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (TRUE);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Groups: only members can see
CREATE POLICY "groups_select" ON public.groups FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.group_members WHERE group_id = id AND user_id = auth.uid()));
CREATE POLICY "groups_insert" ON public.groups FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "groups_update" ON public.groups FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.group_members WHERE group_id = id AND user_id = auth.uid() AND role = 'ADMIN'));
CREATE POLICY "groups_delete" ON public.groups FOR DELETE
  USING (auth.uid() = created_by);

-- Group members
CREATE POLICY "gm_select" ON public.group_members FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.group_members gm WHERE gm.group_id = group_id AND gm.user_id = auth.uid()));
CREATE POLICY "gm_insert" ON public.group_members FOR INSERT
  WITH CHECK (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.group_members WHERE group_id = group_members.group_id AND user_id = auth.uid() AND role = 'ADMIN'
  ));
CREATE POLICY "gm_delete" ON public.group_members FOR DELETE
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.group_members gm WHERE gm.group_id = group_id AND gm.user_id = auth.uid() AND gm.role = 'ADMIN'
  ));

-- Expenses: group members only
CREATE POLICY "expenses_select" ON public.expenses FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.group_members WHERE group_id = expenses.group_id AND user_id = auth.uid()));
CREATE POLICY "expenses_insert" ON public.expenses FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.group_members WHERE group_id = expenses.group_id AND user_id = auth.uid()));
CREATE POLICY "expenses_update" ON public.expenses FOR UPDATE
  USING (payer_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.group_members WHERE group_id = expenses.group_id AND user_id = auth.uid() AND role = 'ADMIN'
  ));
CREATE POLICY "expenses_delete" ON public.expenses FOR DELETE
  USING (payer_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.group_members WHERE group_id = expenses.group_id AND user_id = auth.uid() AND role = 'ADMIN'
  ));

-- Expense splits
CREATE POLICY "splits_select" ON public.expense_splits FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.expenses e
    JOIN public.group_members gm ON gm.group_id = e.group_id
    WHERE e.id = expense_splits.expense_id AND gm.user_id = auth.uid()
  ));
CREATE POLICY "splits_insert" ON public.expense_splits FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.expenses e
    JOIN public.group_members gm ON gm.group_id = e.group_id
    WHERE e.id = expense_splits.expense_id AND gm.user_id = auth.uid()
  ));
CREATE POLICY "splits_update" ON public.expense_splits FOR UPDATE
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.expenses e
    JOIN public.group_members gm ON gm.group_id = e.group_id
    WHERE e.id = expense_splits.expense_id AND gm.user_id = auth.uid() AND gm.role = 'ADMIN'
  ));

-- Settlements
CREATE POLICY "settlements_select" ON public.settlements FOR SELECT
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());
CREATE POLICY "settlements_insert" ON public.settlements FOR INSERT
  WITH CHECK (sender_id = auth.uid());
CREATE POLICY "settlements_update" ON public.settlements FOR UPDATE
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

-- Notifications: own only
CREATE POLICY "notifs_select" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "notifs_update" ON public.notifications FOR UPDATE USING (user_id = auth.uid());

-- Badges: public read
CREATE POLICY "badges_select" ON public.badges FOR SELECT USING (TRUE);
CREATE POLICY "user_badges_select" ON public.user_badges FOR SELECT USING (user_id = auth.uid());

-- ============================================================
-- SEED BADGES
-- ============================================================
INSERT INTO public.badges (name, description, icon, color, condition, points) VALUES
  ('First Settle',   'Settled your first debt',         '🏆', '#F5B800', 'first_settlement',    50),
  ('Speed Settler',  'Settled within 24 hours',         '⚡', '#3B82F6', 'settle_within_24h',   100),
  ('Golden Duck',    '7-day settling streak',           '🦆', '#F5B800', 'streak_7',            200),
  ('Group Creator',  'Created your first group',        '👥', '#10B981', 'first_group',          30),
  ('Big Spender',    'Tracked $1,000+ in expenses',     '💰', '#8B5CF6', 'total_expenses_1000', 150),
  ('Penny Perfect',  'Split with exact amounts 5 times','🎯', '#EC4899', 'exact_split_5',        75),
  ('Globetrotter',   'Used 3+ currencies',              '🌍', '#F97316', 'multi_currency_3',    125)
ON CONFLICT (name) DO NOTHING;
