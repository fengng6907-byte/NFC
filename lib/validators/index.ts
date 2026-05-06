import { z } from 'zod'

// ── Auth ───────────────────────────────────────────────────────
export const loginSchema = z.object({
  email:    z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters').max(80),
  email:    z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
})

// ── Groups ──────────────────────────────────────────────────────
export const createGroupSchema = z.object({
  name:        z.string().min(1, 'Group name is required').max(100),
  description: z.string().max(500).optional(),
  emoji:       z.string().default('📁'),
  type:        z.enum(['TRIP','HOME','FRIENDS','BUSINESS','EVENT','OTHER']).default('OTHER'),
  color:       z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color').default('#F5B800'),
  currency:    z.string().length(3, 'Currency must be 3 characters').default('USD'),
  memberEmails: z.array(z.string().email()).optional().default([]),
})

export const updateGroupSchema = createGroupSchema.partial().omit({ memberEmails: true })

// ── Expenses ────────────────────────────────────────────────────
export const createExpenseSchema = z.object({
  groupId:      z.string().uuid('Invalid group ID'),
  payerId:      z.string().uuid('Invalid payer ID'),
  title:        z.string().min(1, 'Title is required').max(200),
  amount:       z.number().positive('Amount must be positive').max(1_000_000),
  currency:     z.string().length(3).default('USD'),
  category:     z.enum([
    'FOOD','TRANSPORT','ACCOMMODATION','ENTERTAINMENT',
    'SHOPPING','UTILITIES','HEALTH','TRAVEL','SPORTS','EDUCATION','OTHER',
  ]).optional(),
  splitMethod:  z.enum(['EQUAL','PERCENTAGE','EXACT','SHARES']).default('EQUAL'),
  date:         z.string().datetime().optional(),
  notes:        z.string().max(1000).optional(),
  participantIds: z.array(z.string().uuid()).min(1, 'At least one participant required'),
  customSplits: z.array(z.object({
    userId:  z.string().uuid(),
    amount:  z.number().optional(),
    percent: z.number().min(0).max(100).optional(),
    shares:  z.number().int().min(1).optional(),
  })).optional(),
  isRecurring:  z.boolean().default(false),
  recurrence:   z.enum(['WEEKLY','BIWEEKLY','MONTHLY']).optional(),
})

// ── Settlements ─────────────────────────────────────────────────
export const createSettlementSchema = z.object({
  receiverId: z.string().uuid('Invalid receiver ID'),
  amount:     z.number().positive('Amount must be positive'),
  currency:   z.string().length(3).default('USD'),
  method:     z.enum(['CASH','BANK_TRANSFER','PAYPAL','VENMO','OTHER']).default('CASH'),
  notes:      z.string().max(500).optional(),
  groupId:    z.string().uuid().optional(),
})

export type LoginInput        = z.infer<typeof loginSchema>
export type RegisterInput     = z.infer<typeof registerSchema>
export type CreateGroupInput  = z.infer<typeof createGroupSchema>
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>
export type CreateSettlementInput = z.infer<typeof createSettlementSchema>
