import { ICategory } from '@/app/_components/Category/Category'

const categories: ICategory[] = [{ name: 'alalal', isOn: true }]

export const GET = () => Response.json(categories)

export const POST = async (request: Request) => {
  const newCategory = await request.json()

  categories.push(newCategory)

  return new Response(JSON.stringify(newCategory), {
    status: 200,
  })
}
