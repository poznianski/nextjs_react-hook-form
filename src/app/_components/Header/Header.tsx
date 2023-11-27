'use client'
import React, { useContext } from 'react'

import { Logo } from '@/app/_components/Logo/Logo'
import { SearchInput } from '@/app/_components/SearchInput/SearchInput'
import { CategoryContext } from '@/app/contexts/CategoryContext/CategoryContext'

export const Header: React.FC = () => {
  const { handleSearchChange } = useContext(CategoryContext)

  return (
    <header
      className="container mx-auto flex flex-col items-center px-4 py-18
        sm:flex-row sm:justify-between sm:px-6 lg:px-8"
    >
      <Logo />
      <SearchInput onSearchChange={handleSearchChange} />
    </header>
  )
}
