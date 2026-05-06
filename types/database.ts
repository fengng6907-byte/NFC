export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type GroupType    = 'TRIP' | 'HOME' | 'FRIENDS' | 'BUSINESS' | 'EVENT' | 'OTHER'
export type SplitMethod  = 'EQUAL' | 'PERCENTAGE' | 'EXACT' | 'SHARES'
export type ExpenseCategory = 'FOOD' | 'TRANSPORT' | 'ACCOMMODATION' | 'ENTERTAINMENT' | 'SHOPPING' | 'UTILITIES' | 'HEALTH' | 'TRAVEL' | 'SPORTS' | 'EDUCATION' | 'OTHER'
export type SettlementStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED'
export type SettlementMethod = 'CASH' | 'BANK_TRANSFER' | 'PAYPAL' | 'VENMO' | 'OTHER'
export type NotificationType = 'EXPENSE_ADDED' | 'SETTLEMENT_REQUESTED' | 'SETTLEMENT_COMPLETED' | 'GROUP_INVITE' | 'REMINDER' | 'BADGE_EARNED'
export type MemberRole = 'ADMIN' | 'MEMBER'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          currency: string
          points: number
          streak_days: number
          last_settled_at: string | null
          total_settled: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at' | 'points' | 'streak_days' | 'total_settled'>
        Update: Partial<Database['public']['Tables']['profiles']['Row']>
      }
      groups: {
        Row: {
          id: string
          name: string
          description: string | null
          emoji: string
          type: GroupType
          color: string
          currency: string
          is_archived: boolean
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['groups']['Row'], 'id' | 'created_at' | 'updated_at' | 'is_archived'>
        Update: Partial<Database['public']['Tables']['groups']['Row']>
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          role: MemberRole
          joined_at: string
        }
        Insert: Omit<Database['public']['Tables']['group_members']['Row'], 'id' | 'joined_at'>
        Update: Partial<Database['public']['Tables']['group_members']['Row']>
      }
      expenses: {
        Row: {
          id: string
          group_id: string
          payer_id: string
          title: string
          amount: number
          currency: string
          category: ExpenseCategory
          split_method: SplitMethod
          notes: string | null
          receipt_url: string | null
          date: string
          is_settled: boolean
          is_recurring: boolean
          recurrence: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | null
          ai_category: string | null
          ai_confidence: number | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['expenses']['Row'], 'id' | 'created_at' | 'updated_at' | 'is_settled' | 'is_recurring'>
        Update: Partial<Database['public']['Tables']['expenses']['Row']>
      }
      expense_splits: {
        Row: {
          id: string
          expense_id: string
          user_id: string
          amount: number
          percent: number | null
          shares: number | null
          is_paid: boolean
          paid_at: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['expense_splits']['Row'], 'id' | 'created_at' | 'is_paid'>
        Update: Partial<Database['public']['Tables']['expense_splits']['Row']>
      }
      settlements: {
        Row: {
          id: string
          group_id: string | null
          sender_id: string
          receiver_id: string
          amount: number
          currency: string
          method: SettlementMethod
          status: SettlementStatus
          notes: string | null
          created_at: string
          settled_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['settlements']['Row'], 'id' | 'created_at' | 'status'>
        Update: Partial<Database['public']['Tables']['settlements']['Row']>
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: NotificationType
          title: string
          message: string
          is_read: boolean
          data: Json | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at' | 'is_read'>
        Update: Partial<Database['public']['Tables']['notifications']['Row']>
      }
      badges: {
        Row: { id: string; name: string; description: string; icon: string; color: string; condition: string; points: number }
        Insert: Omit<Database['public']['Tables']['badges']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['badges']['Row']>
      }
      user_badges: {
        Row: { id: string; user_id: string; badge_id: string; earned_at: string }
        Insert: Omit<Database['public']['Tables']['user_badges']['Row'], 'id' | 'earned_at'>
        Update: never
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// ── Convenience row types ────────────────────────────────────
export type Profile       = Database['public']['Tables']['profiles']['Row']
export type Group         = Database['public']['Tables']['groups']['Row']
export type GroupMember   = Database['public']['Tables']['group_members']['Row']
export type Expense       = Database['public']['Tables']['expenses']['Row']
export type ExpenseSplit  = Database['public']['Tables']['expense_splits']['Row']
export type Settlement    = Database['public']['Tables']['settlements']['Row']
export type Notification  = Database['public']['Tables']['notifications']['Row']
export type Badge         = Database['public']['Tables']['badges']['Row']
export type UserBadge     = Database['public']['Tables']['user_badges']['Row']

// ── Enriched joined types ─────────────────────────────────────
export type GroupWithMembers = Group & {
  group_members: (GroupMember & { profiles: Profile })[]
}

export type ExpenseWithDetails = Expense & {
  profiles: Profile                          // payer
  expense_splits: (ExpenseSplit & { profiles: Profile })[]
}

export type SettlementWithUsers = Settlement & {
  sender:   Profile
  receiver: Profile
}
