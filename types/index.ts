// ─── Core Domain Types ────────────────────────────────────────────────────────

export type SplitMethod = 'EQUAL' | 'PERCENTAGE' | 'EXACT' | 'SHARES'
export type GroupType = 'TRIP' | 'HOME' | 'FRIENDS' | 'BUSINESS' | 'EVENT' | 'OTHER'
export type Category = 'FOOD' | 'TRANSPORT' | 'ACCOMMODATION' | 'ENTERTAINMENT' | 'SHOPPING' | 'UTILITIES' | 'HEALTH' | 'TRAVEL' | 'SPORTS' | 'EDUCATION' | 'OTHER'
export type SettlementStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED'
export type NotificationType = 'EXPENSE_ADDED' | 'SETTLEMENT_REQUESTED' | 'SETTLEMENT_COMPLETED' | 'GROUP_INVITE' | 'REMINDER' | 'BADGE_EARNED'

export interface User {
  id: string
  email: string
  name: string
  image?: string
  points: number
  streakDays: number
  totalSettled: number
  badges?: Badge[]
}

export interface Group {
  id: string
  name: string
  description?: string
  emoji: string
  type: GroupType
  color: string
  currency: string
  createdAt: string
  members: GroupMember[]
  expenses: Expense[]
  totalExpenses: number
  yourBalance: number
}

export interface GroupMember {
  id: string
  userId: string
  groupId: string
  role: 'ADMIN' | 'MEMBER'
  user: User
}

export interface Expense {
  id: string
  title: string
  amount: number
  currency: string
  category: Category
  splitMethod: SplitMethod
  date: string
  notes?: string
  receiptUrl?: string
  isSettled: boolean
  aiCategory?: string
  aiConfidence?: number
  payer: User
  payerId: string
  groupId: string
  shares: ExpenseShare[]
  createdAt: string
}

export interface ExpenseShare {
  id: string
  expenseId: string
  userId: string
  amount: number
  percent?: number
  isPaid: boolean
  user: User
}

export interface Settlement {
  id: string
  amount: number
  currency: string
  notes?: string
  method: string
  status: SettlementStatus
  sender: User
  receiver: User
  groupId?: string
  createdAt: string
  settledAt?: string
}

export interface Balance {
  userId: string
  user: User
  owes: number    // positive = you owe them, negative = they owe you
  net: number
}

export interface GroupBalance {
  groupId: string
  balances: Balance[]
  simplifiedDebts: Debt[]
}

export interface Debt {
  fromUserId: string
  toUserId: string
  fromUser: User
  toUser: User
  amount: number
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  createdAt: string
  data?: Record<string, unknown>
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  points: number
  earnedAt?: string
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

// ─── Form Types ───────────────────────────────────────────────────────────────

export interface CreateExpenseInput {
  title: string
  amount: number
  category: Category
  splitMethod: SplitMethod
  date: string
  notes?: string
  payerId: string
  groupId: string
  participants: string[]
  splits?: { userId: string; amount?: number; percent?: number; shares?: number }[]
}

export interface CreateGroupInput {
  name: string
  description?: string
  emoji: string
  type: GroupType
  color: string
  currency: string
  memberEmails: string[]
}

// ─── Analytics Types ──────────────────────────────────────────────────────────

export interface SpendingByCategory {
  category: Category
  amount: number
  count: number
  percent: number
}

export interface MonthlySpending {
  month: string
  total: number
  settled: number
  outstanding: number
}

export interface DashboardStats {
  totalOwed: number
  totalOwing: number
  netBalance: number
  activeGroups: number
  thisMonthSpending: number
  settledThisMonth: number
}

// ─── Category metadata ────────────────────────────────────────────────────────

export const CATEGORY_META: Record<Category, { label: string; icon: string; color: string }> = {
  FOOD:          { label: 'Food & Drink',    icon: '🍔', color: '#F59E0B' },
  TRANSPORT:     { label: 'Transport',        icon: '🚗', color: '#3B82F6' },
  ACCOMMODATION: { label: 'Accommodation',    icon: '🏨', color: '#8B5CF6' },
  ENTERTAINMENT: { label: 'Entertainment',    icon: '🎬', color: '#EC4899' },
  SHOPPING:      { label: 'Shopping',         icon: '🛍️', color: '#06B6D4' },
  UTILITIES:     { label: 'Utilities',        icon: '⚡', color: '#84CC16' },
  HEALTH:        { label: 'Health',           icon: '💊', color: '#EF4444' },
  TRAVEL:        { label: 'Travel',           icon: '✈️', color: '#F97316' },
  SPORTS:        { label: 'Sports',           icon: '⚽', color: '#10B981' },
  EDUCATION:     { label: 'Education',        icon: '📚', color: '#6366F1' },
  OTHER:         { label: 'Other',            icon: '📦', color: '#9CA3AF' },
}

export const GROUP_TYPE_META: Record<GroupType, { label: string; emoji: string }> = {
  TRIP:     { label: 'Trip',        emoji: '✈️' },
  HOME:     { label: 'Home',        emoji: '🏠' },
  FRIENDS:  { label: 'Friends',     emoji: '👥' },
  BUSINESS: { label: 'Business',    emoji: '💼' },
  EVENT:    { label: 'Event',       emoji: '🎉' },
  OTHER:    { label: 'Other',       emoji: '📁' },
}
