import React from 'react'

import { CategoriesList } from '@/app/_components/CategoriesList/CategoriesList'
import { Header } from '@/app/_components/Header/Header'
import { Separator } from '@/app/_components/Separator/Separator'
import { CategoryProvider } from '@/app/contexts/CategoryContext/CategoryContext'

export default function Home() {
  return (
    <CategoryProvider>
      <Header />

      <Separator />

      <div className="">
        <CategoriesList />
      </div>
    </CategoryProvider>
  )
}
