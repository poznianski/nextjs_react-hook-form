import React from 'react'

import { CategoriesList } from '@/app/_components/CategoriesList/CategoriesList'
import { Header } from '@/app/_components/Header/Header'
import { Separator } from '@/app/_components/Separator/Separator'
import { CategoryProvider } from '@/app/contexts/CategoryContext/CategoryContext'

export default function Home() {
  return (
    <CategoryProvider>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
      </div>

      <Separator />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CategoriesList />
      </div>
    </CategoryProvider>
  )
}
