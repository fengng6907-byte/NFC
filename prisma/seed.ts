import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🦆 Seeding Gold Dutchy database...')

  // Create badges
  const badges = await Promise.all([
    prisma.badge.upsert({
      where: { id: 'badge-first-settle' },
      create: { id: 'badge-first-settle', name: 'First Settle', description: 'Settled your first debt', icon: '🏆', color: '#F5B800', condition: 'first_settlement', points: 50 },
      update: {},
    }),
    prisma.badge.upsert({
      where: { id: 'badge-speed-settler' },
      create: { id: 'badge-speed-settler', name: 'Speed Settler', description: 'Settled within 24 hours', icon: '⚡', color: '#3B82F6', condition: 'settle_within_24h', points: 100 },
      update: {},
    }),
    prisma.badge.upsert({
      where: { id: 'badge-golden-duck' },
      create: { id: 'badge-golden-duck', name: 'Golden Duck', description: '7-day settling streak', icon: '🦆', color: '#F5B800', condition: 'streak_7', points: 200 },
      update: {},
    }),
    prisma.badge.upsert({
      where: { id: 'badge-group-creator' },
      create: { id: 'badge-group-creator', name: 'Group Creator', description: 'Created your first group', icon: '👥', color: '#10B981', condition: 'first_group', points: 30 },
      update: {},
    }),
    prisma.badge.upsert({
      where: { id: 'badge-big-spender' },
      create: { id: 'badge-big-spender', name: 'Big Spender', description: 'Tracked $1000+ in expenses', icon: '💰', color: '#8B5CF6', condition: 'total_expenses_1000', points: 150 },
      update: {},
    }),
  ])

  // Create users
  const passwordHash = await bcrypt.hash('password123', 12)

  const alex = await prisma.user.upsert({
    where: { email: 'alex@example.com' },
    create: {
      id: 'user-1',
      email: 'alex@example.com',
      name: 'Alex Chen',
      passwordHash,
      points: 450,
      streakDays: 7,
      totalSettled: 1240.50,
    },
    update: {},
  })

  const jamie = await prisma.user.upsert({
    where: { email: 'jamie@example.com' },
    create: {
      id: 'user-2',
      email: 'jamie@example.com',
      name: 'Jamie Rivera',
      passwordHash,
      points: 280,
      streakDays: 3,
      totalSettled: 890.00,
    },
    update: {},
  })

  const sam = await prisma.user.upsert({
    where: { email: 'sam@example.com' },
    create: {
      id: 'user-3',
      email: 'sam@example.com',
      name: 'Sam Patel',
      passwordHash,
      points: 620,
      streakDays: 14,
      totalSettled: 2100.75,
    },
    update: {},
  })

  const morgan = await prisma.user.upsert({
    where: { email: 'morgan@example.com' },
    create: {
      id: 'user-4',
      email: 'morgan@example.com',
      name: 'Morgan Lee',
      passwordHash,
      points: 120,
      streakDays: 1,
      totalSettled: 340.00,
    },
    update: {},
  })

  const riley = await prisma.user.upsert({
    where: { email: 'riley@example.com' },
    create: {
      id: 'user-5',
      email: 'riley@example.com',
      name: 'Riley Kim',
      passwordHash,
      points: 890,
      streakDays: 21,
      totalSettled: 3400.20,
    },
    update: {},
  })

  // Assign badges to Alex
  await prisma.userBadge.createMany({
    data: [
      { userId: alex.id, badgeId: 'badge-first-settle', earnedAt: new Date('2024-01-15') },
      { userId: alex.id, badgeId: 'badge-speed-settler', earnedAt: new Date('2024-02-03') },
      { userId: alex.id, badgeId: 'badge-golden-duck', earnedAt: new Date('2024-03-10') },
      { userId: alex.id, badgeId: 'badge-group-creator', earnedAt: new Date('2024-01-10') },
    ],
    skipDuplicates: true,
  })

  // Create groups
  const tokyoGroup = await prisma.group.upsert({
    where: { id: 'group-1' },
    create: {
      id: 'group-1',
      name: 'Tokyo Trip 2024',
      description: 'Our amazing 2-week Japan adventure',
      emoji: '✈️',
      type: 'TRIP',
      color: '#F5B800',
      currency: 'USD',
      createdById: alex.id,
    },
    update: {},
  })

  const apartmentGroup = await prisma.group.upsert({
    where: { id: 'group-2' },
    create: {
      id: 'group-2',
      name: 'Downtown Apartment',
      description: 'Shared living expenses',
      emoji: '🏠',
      type: 'HOME',
      color: '#8B5CF6',
      currency: 'USD',
      createdById: sam.id,
    },
    update: {},
  })

  const friendsGroup = await prisma.group.upsert({
    where: { id: 'group-3' },
    create: {
      id: 'group-3',
      name: 'Friday Night Crew',
      description: 'Weekly dinners and outings',
      emoji: '🎉',
      type: 'FRIENDS',
      color: '#EC4899',
      currency: 'USD',
      createdById: morgan.id,
    },
    update: {},
  })

  // Add members
  await prisma.groupMember.createMany({
    data: [
      { userId: alex.id, groupId: tokyoGroup.id, role: 'ADMIN' },
      { userId: jamie.id, groupId: tokyoGroup.id, role: 'MEMBER' },
      { userId: sam.id, groupId: tokyoGroup.id, role: 'MEMBER' },
      { userId: morgan.id, groupId: tokyoGroup.id, role: 'MEMBER' },
      { userId: alex.id, groupId: apartmentGroup.id, role: 'MEMBER' },
      { userId: sam.id, groupId: apartmentGroup.id, role: 'ADMIN' },
      { userId: riley.id, groupId: apartmentGroup.id, role: 'MEMBER' },
      { userId: alex.id, groupId: friendsGroup.id, role: 'MEMBER' },
      { userId: jamie.id, groupId: friendsGroup.id, role: 'MEMBER' },
      { userId: morgan.id, groupId: friendsGroup.id, role: 'ADMIN' },
      { userId: riley.id, groupId: friendsGroup.id, role: 'MEMBER' },
    ],
    skipDuplicates: true,
  })

  // Create expenses
  const taxiExpense = await prisma.expense.upsert({
    where: { id: 'exp-1' },
    create: {
      id: 'exp-1',
      title: 'Narita Airport Taxi',
      amount: 120.00,
      currency: 'USD',
      category: 'TRANSPORT',
      splitMethod: 'EQUAL',
      date: new Date('2024-03-15'),
      payerId: alex.id,
      groupId: tokyoGroup.id,
      aiCategory: 'TRANSPORT',
      aiConfidence: 0.94,
    },
    update: {},
  })

  await prisma.expenseShare.createMany({
    data: [
      { expenseId: taxiExpense.id, userId: alex.id, amount: 30.00, isPaid: true },
      { expenseId: taxiExpense.id, userId: jamie.id, amount: 30.00, isPaid: false },
      { expenseId: taxiExpense.id, userId: sam.id, amount: 30.00, isPaid: false },
      { expenseId: taxiExpense.id, userId: morgan.id, amount: 30.00, isPaid: false },
    ],
    skipDuplicates: true,
  })

  const ramenExpense = await prisma.expense.upsert({
    where: { id: 'exp-2' },
    create: {
      id: 'exp-2',
      title: 'Shinjuku Ramen Dinner',
      amount: 210.50,
      currency: 'USD',
      category: 'FOOD',
      splitMethod: 'EQUAL',
      date: new Date('2024-03-16'),
      payerId: jamie.id,
      groupId: tokyoGroup.id,
      aiCategory: 'FOOD',
      aiConfidence: 0.97,
    },
    update: {},
  })

  await prisma.expenseShare.createMany({
    data: [
      { expenseId: ramenExpense.id, userId: alex.id, amount: 52.63, isPaid: false },
      { expenseId: ramenExpense.id, userId: jamie.id, amount: 52.62, isPaid: true },
      { expenseId: ramenExpense.id, userId: sam.id, amount: 52.63, isPaid: false },
      { expenseId: ramenExpense.id, userId: morgan.id, amount: 52.62, isPaid: false },
    ],
    skipDuplicates: true,
  })

  // Notifications
  await prisma.notification.createMany({
    data: [
      {
        id: 'notif-1',
        userId: alex.id,
        type: 'EXPENSE_ADDED',
        title: 'New expense in Tokyo Trip',
        message: 'Jamie added "Shinjuku Ramen" - you owe $52.63',
      },
      {
        id: 'notif-2',
        userId: alex.id,
        type: 'BADGE_EARNED',
        title: '🦆 Golden Duck Badge Earned!',
        message: "You've maintained a 7-day settling streak. Keep it up!",
        isRead: true,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Seed complete! Gold Dutchy is ready.')
  console.log(`   👥 ${5} users created`)
  console.log(`   🏘️  ${3} groups created`)
  console.log(`   💸 ${2} expenses created`)
  console.log(`   🏆 ${5} badges created`)
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
