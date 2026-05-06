import { NextRequest, NextResponse } from 'next/server'
import { aiCategorize } from '@/lib/split'
import { CATEGORY_META } from '@/types'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title } = body

  if (!title || typeof title !== 'string') {
    return NextResponse.json({ error: 'title is required' }, { status: 400 })
  }

  const result = aiCategorize(title)
  const meta = CATEGORY_META[result.category as keyof typeof CATEGORY_META]

  return NextResponse.json({
    data: {
      category: result.category,
      confidence: result.confidence,
      label: meta?.label ?? result.category,
      icon: meta?.icon ?? '📦',
    }
  })
}

export async function GET() {
  const categories = Object.entries(CATEGORY_META).map(([key, meta]) => ({
    value: key,
    label: meta.label,
    icon: meta.icon,
    color: meta.color,
  }))

  return NextResponse.json({ data: categories })
}
