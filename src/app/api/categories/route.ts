import { NextRequest, NextResponse } from 'next/server'
import { createEdgeRouter } from 'next-connect'

import { ICategory } from '@/app/_components/Category/Category'

interface RequestContext {
  params: {
    id: string
  }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

let categories: ICategory[] = [
  {
    name: 'Canada',
    id: '60dd06d2-6bb9-4fa9-b52c-fa1196f1ded1',
    isOn: false,
  },
  {
    name: 'Poland',
    id: '284050f6-cb88-4f28-901d-7f3fdf4f01d7',
    isOn: true,
  },
  {
    name: 'Lambada',
    id: 'eb041880-91d0-420f-be6e-690f96e32957',
    isOn: false,
  },
]

router.get((req, res) => {
  return NextResponse.json(categories)
})

router.put(async (req, res) => {})

router.post(async (req, res) => {
  const newCategory: ICategory = await req.json()
  categories.push(newCategory)

  return NextResponse.json(newCategory)
})

router.delete((req, res) => {})

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}
