import type { User, Group, Expense, Settlement, Notification, Badge } from '@/types'

// ─── Mock Users ───────────────────────────────────────────────────────────────

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    email: 'alex@example.com',
    name: 'Alex Chen',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    points: 450,
    streakDays: 7,
    totalSettled: 1240.50,
  },
  {
    id: 'user-2',
    email: 'jamie@example.com',
    name: 'Jamie Rivera',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jamie',
    points: 280,
    streakDays: 3,
    totalSettled: 890.00,
  },
  {
    id: 'user-3',
    email: 'sam@example.com',
    name: 'Sam Patel',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sam',
    points: 620,
    streakDays: 14,
    totalSettled: 2100.75,
  },
  {
    id: 'user-4',
    email: 'morgan@example.com',
    name: 'Morgan Lee',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=morgan',
    points: 120,
    streakDays: 1,
    totalSettled: 340.00,
  },
  {
    id: 'user-5',
    email: 'riley@example.com',
    name: 'Riley Kim',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=riley',
    points: 890,
    streakDays: 21,
    totalSettled: 3400.20,
  },
]

export const CURRENT_USER = MOCK_USERS[0]

// ─── Mock Badges ──────────────────────────────────────────────────────────────

export const MOCK_BADGES: Badge[] = [
  { id: 'b1', name: 'First Settle', description: 'Settled your first debt', icon: '🏆', color: '#F5B800', points: 50, earnedAt: '2024-01-15' },
  { id: 'b2', name: 'Speed Settler', description: 'Settled within 24 hours', icon: '⚡', color: '#3B82F6', points: 100, earnedAt: '2024-02-03' },
  { id: 'b3', name: 'Golden Duck', description: '7-day settling streak', icon: '🦆', color: '#F5B800', points: 200, earnedAt: '2024-03-10' },
  { id: 'b4', name: 'Group Creator', description: 'Created your first group', icon: '👥', color: '#10B981', points: 30, earnedAt: '2024-01-10' },
  { id: 'b5', name: 'Big Spender', description: 'Tracked $1000+ in expenses', icon: '💰', color: '#8B5CF6', points: 150 },
]

// ─── Mock Groups ──────────────────────────────────────────────────────────────

export const MOCK_GROUPS: Group[] = [
  {
    id: 'group-1',
    name: 'Tokyo Trip 2024',
    description: 'Our amazing 2-week Japan adventure',
    emoji: '✈️',
    type: 'TRIP',
    color: '#F5B800',
    currency: 'USD',
    createdAt: '2024-01-10T10:00:00Z',
    members: [
      { id: 'gm-1', userId: 'user-1', groupId: 'group-1', role: 'ADMIN', user: MOCK_USERS[0] },
      { id: 'gm-2', userId: 'user-2', groupId: 'group-1', role: 'MEMBER', user: MOCK_USERS[1] },
      { id: 'gm-3', userId: 'user-3', groupId: 'group-1', role: 'MEMBER', user: MOCK_USERS[2] },
      { id: 'gm-4', userId: 'user-4', groupId: 'group-1', role: 'MEMBER', user: MOCK_USERS[3] },
    ],
    expenses: [],
    totalExpenses: 3840.50,
    yourBalance: -127.50,
  },
  {
    id: 'group-2',
    name: 'Downtown Apartment',
    description: 'Shared living expenses',
    emoji: '🏠',
    type: 'HOME',
    color: '#8B5CF6',
    currency: 'USD',
    createdAt: '2024-02-01T10:00:00Z',
    members: [
      { id: 'gm-5', userId: 'user-1', groupId: 'group-2', role: 'MEMBER', user: MOCK_USERS[0] },
      { id: 'gm-6', userId: 'user-3', groupId: 'group-2', role: 'ADMIN', user: MOCK_USERS[2] },
      { id: 'gm-7', userId: 'user-5', groupId: 'group-2', role: 'MEMBER', user: MOCK_USERS[4] },
    ],
    expenses: [],
    totalExpenses: 2140.00,
    yourBalance: 84.33,
  },
  {
    id: 'group-3',
    name: 'Friday Night Crew',
    description: 'Weekly dinners and outings',
    emoji: '🎉',
    type: 'FRIENDS',
    color: '#EC4899',
    currency: 'USD',
    createdAt: '2024-03-15T10:00:00Z',
    members: [
      { id: 'gm-8', userId: 'user-1', groupId: 'group-3', role: 'MEMBER', user: MOCK_USERS[0] },
      { id: 'gm-9', userId: 'user-2', groupId: 'group-3', role: 'MEMBER', user: MOCK_USERS[1] },
      { id: 'gm-10', userId: 'user-4', groupId: 'group-3', role: 'ADMIN', user: MOCK_USERS[3] },
      { id: 'gm-11', userId: 'user-5', groupId: 'group-3', role: 'MEMBER', user: MOCK_USERS[4] },
    ],
    expenses: [],
    totalExpenses: 892.40,
    yourBalance: 43.20,
  },
  {
    id: 'group-4',
    name: 'Startup Team',
    description: 'Office expenses & team lunches',
    emoji: '💼',
    type: 'BUSINESS',
    color: '#10B981',
    currency: 'USD',
    createdAt: '2024-04-01T10:00:00Z',
    members: [
      { id: 'gm-12', userId: 'user-1', groupId: 'group-4', role: 'ADMIN', user: MOCK_USERS[0] },
      { id: 'gm-13', userId: 'user-2', groupId: 'group-4', role: 'MEMBER', user: MOCK_USERS[1] },
      { id: 'gm-14', userId: 'user-3', groupId: 'group-4', role: 'MEMBER', user: MOCK_USERS[2] },
    ],
    expenses: [],
    totalExpenses: 540.80,
    yourBalance: -18.60,
  },
]

// ─── Mock Expenses ────────────────────────────────────────────────────────────

export const MOCK_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    title: 'Narita Airport Taxi',
    amount: 120.00,
    currency: 'USD',
    category: 'TRANSPORT',
    splitMethod: 'EQUAL',
    date: '2024-03-15T09:00:00Z',
    isSettled: false,
    payer: MOCK_USERS[0],
    payerId: 'user-1',
    groupId: 'group-1',
    aiCategory: 'TRANSPORT',
    aiConfidence: 0.94,
    shares: [
      { id: 'sh-1', expenseId: 'exp-1', userId: 'user-1', amount: 30.00, isPaid: true, user: MOCK_USERS[0] },
      { id: 'sh-2', expenseId: 'exp-1', userId: 'user-2', amount: 30.00, isPaid: false, user: MOCK_USERS[1] },
      { id: 'sh-3', expenseId: 'exp-1', userId: 'user-3', amount: 30.00, isPaid: false, user: MOCK_USERS[2] },
      { id: 'sh-4', expenseId: 'exp-1', userId: 'user-4', amount: 30.00, isPaid: false, user: MOCK_USERS[3] },
    ],
    createdAt: '2024-03-15T09:00:00Z',
  },
  {
    id: 'exp-2',
    title: 'Shinjuku Ramen Dinner',
    amount: 210.50,
    currency: 'USD',
    category: 'FOOD',
    splitMethod: 'EQUAL',
    date: '2024-03-16T19:30:00Z',
    isSettled: false,
    payer: MOCK_USERS[1],
    payerId: 'user-2',
    groupId: 'group-1',
    aiCategory: 'FOOD',
    aiConfidence: 0.97,
    shares: [
      { id: 'sh-5', expenseId: 'exp-2', userId: 'user-1', amount: 52.63, isPaid: false, user: MOCK_USERS[0] },
      { id: 'sh-6', expenseId: 'exp-2', userId: 'user-2', amount: 52.62, isPaid: true, user: MOCK_USERS[1] },
      { id: 'sh-7', expenseId: 'exp-2', userId: 'user-3', amount: 52.63, isPaid: false, user: MOCK_USERS[2] },
      { id: 'sh-8', expenseId: 'exp-2', userId: 'user-4', amount: 52.62, isPaid: false, user: MOCK_USERS[3] },
    ],
    createdAt: '2024-03-16T19:30:00Z',
  },
  {
    id: 'exp-3',
    title: 'Shibuya Hotel (4 nights)',
    amount: 1200.00,
    currency: 'USD',
    category: 'ACCOMMODATION',
    splitMethod: 'EQUAL',
    date: '2024-03-15T14:00:00Z',
    isSettled: false,
    payer: MOCK_USERS[2],
    payerId: 'user-3',
    groupId: 'group-1',
    aiCategory: 'ACCOMMODATION',
    aiConfidence: 0.99,
    shares: [
      { id: 'sh-9',  expenseId: 'exp-3', userId: 'user-1', amount: 300.00, isPaid: false, user: MOCK_USERS[0] },
      { id: 'sh-10', expenseId: 'exp-3', userId: 'user-2', amount: 300.00, isPaid: false, user: MOCK_USERS[1] },
      { id: 'sh-11', expenseId: 'exp-3', userId: 'user-3', amount: 300.00, isPaid: true,  user: MOCK_USERS[2] },
      { id: 'sh-12', expenseId: 'exp-3', userId: 'user-4', amount: 300.00, isPaid: false, user: MOCK_USERS[3] },
    ],
    createdAt: '2024-03-15T14:00:00Z',
  },
  {
    id: 'exp-4',
    title: 'April Rent',
    amount: 2100.00,
    currency: 'USD',
    category: 'UTILITIES',
    splitMethod: 'EQUAL',
    date: '2024-04-01T10:00:00Z',
    isSettled: false,
    payer: MOCK_USERS[2],
    payerId: 'user-3',
    groupId: 'group-2',
    aiCategory: 'UTILITIES',
    aiConfidence: 0.88,
    shares: [
      { id: 'sh-13', expenseId: 'exp-4', userId: 'user-1', amount: 700.00, isPaid: true,  user: MOCK_USERS[0] },
      { id: 'sh-14', expenseId: 'exp-4', userId: 'user-3', amount: 700.00, isPaid: true,  user: MOCK_USERS[2] },
      { id: 'sh-15', expenseId: 'exp-4', userId: 'user-5', amount: 700.00, isPaid: false, user: MOCK_USERS[4] },
    ],
    createdAt: '2024-04-01T10:00:00Z',
  },
  {
    id: 'exp-5',
    title: 'Friday Pizza Night',
    amount: 87.40,
    currency: 'USD',
    category: 'FOOD',
    splitMethod: 'EQUAL',
    date: '2024-04-12T20:00:00Z',
    isSettled: false,
    payer: MOCK_USERS[3],
    payerId: 'user-4',
    groupId: 'group-3',
    aiCategory: 'FOOD',
    aiConfidence: 0.96,
    shares: [
      { id: 'sh-16', expenseId: 'exp-5', userId: 'user-1', amount: 21.85, isPaid: false, user: MOCK_USERS[0] },
      { id: 'sh-17', expenseId: 'exp-5', userId: 'user-2', amount: 21.85, isPaid: true,  user: MOCK_USERS[1] },
      { id: 'sh-18', expenseId: 'exp-5', userId: 'user-4', amount: 21.85, isPaid: true,  user: MOCK_USERS[3] },
      { id: 'sh-19', expenseId: 'exp-5', userId: 'user-5', amount: 21.85, isPaid: false, user: MOCK_USERS[4] },
    ],
    createdAt: '2024-04-12T20:00:00Z',
  },
  {
    id: 'exp-6',
    title: 'Team Lunch at Nobu',
    amount: 340.80,
    currency: 'USD',
    category: 'FOOD',
    splitMethod: 'EQUAL',
    date: '2024-04-18T13:00:00Z',
    isSettled: false,
    payer: MOCK_USERS[0],
    payerId: 'user-1',
    groupId: 'group-4',
    aiCategory: 'FOOD',
    aiConfidence: 0.95,
    shares: [
      { id: 'sh-20', expenseId: 'exp-6', userId: 'user-1', amount: 113.60, isPaid: true,  user: MOCK_USERS[0] },
      { id: 'sh-21', expenseId: 'exp-6', userId: 'user-2', amount: 113.60, isPaid: false, user: MOCK_USERS[1] },
      { id: 'sh-22', expenseId: 'exp-6', userId: 'user-3', amount: 113.60, isPaid: false, user: MOCK_USERS[2] },
    ],
    createdAt: '2024-04-18T13:00:00Z',
  },
]

// ─── Mock Settlements ─────────────────────────────────────────────────────────

export const MOCK_SETTLEMENTS: Settlement[] = [
  {
    id: 'set-1',
    amount: 150.00,
    currency: 'USD',
    notes: 'Tokyo hotel split',
    method: 'BANK_TRANSFER',
    status: 'COMPLETED',
    sender: MOCK_USERS[1],
    receiver: MOCK_USERS[0],
    groupId: 'group-1',
    createdAt: '2024-03-20T10:00:00Z',
    settledAt: '2024-03-20T10:00:00Z',
  },
  {
    id: 'set-2',
    amount: 84.33,
    currency: 'USD',
    notes: 'March utilities',
    method: 'CASH',
    status: 'PENDING',
    sender: MOCK_USERS[4],
    receiver: MOCK_USERS[0],
    groupId: 'group-2',
    createdAt: '2024-04-05T10:00:00Z',
  },
]

// ─── Mock Notifications ───────────────────────────────────────────────────────

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'EXPENSE_ADDED',
    title: 'New expense in Tokyo Trip',
    message: 'Jamie added "Shinjuku Ramen" - you owe $52.63',
    isRead: false,
    createdAt: '2024-03-16T19:35:00Z',
  },
  {
    id: 'notif-2',
    type: 'SETTLEMENT_REQUESTED',
    title: 'Settlement request from Riley',
    message: 'Riley is requesting $700.00 for April Rent',
    isRead: false,
    createdAt: '2024-04-02T09:00:00Z',
  },
  {
    id: 'notif-3',
    type: 'BADGE_EARNED',
    title: '🦆 Golden Duck Badge Earned!',
    message: 'You\'ve maintained a 7-day settling streak. Keep it up!',
    isRead: true,
    createdAt: '2024-03-10T12:00:00Z',
  },
  {
    id: 'notif-4',
    type: 'REMINDER',
    title: 'You owe Morgan $21.85',
    message: 'Pizza night from Friday - settle up to keep your streak!',
    isRead: true,
    createdAt: '2024-04-14T10:00:00Z',
  },
]

// ─── Monthly spending chart data ──────────────────────────────────────────────

export const MOCK_MONTHLY_SPENDING = [
  { month: 'Nov', total: 420, settled: 380, outstanding: 40 },
  { month: 'Dec', total: 890, settled: 820, outstanding: 70 },
  { month: 'Jan', total: 640, settled: 580, outstanding: 60 },
  { month: 'Feb', total: 1100, settled: 950, outstanding: 150 },
  { month: 'Mar', total: 2240, settled: 1800, outstanding: 440 },
  { month: 'Apr', total: 980, settled: 600, outstanding: 380 },
]

export const MOCK_CATEGORY_SPENDING = [
  { category: 'ACCOMMODATION', amount: 1500, count: 3, percent: 38.9 },
  { category: 'FOOD',          amount: 638,  count: 12, percent: 16.6 },
  { category: 'TRANSPORT',     amount: 420,  count: 8,  percent: 10.9 },
  { category: 'ENTERTAINMENT', amount: 380,  count: 5,  percent: 9.9 },
  { category: 'UTILITIES',     amount: 700,  count: 2,  percent: 18.2 },
  { category: 'OTHER',         amount: 210,  count: 4,  percent: 5.5 },
]
