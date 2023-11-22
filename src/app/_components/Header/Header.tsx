'use client'
import React, { useContext } from 'react'

import { Logo } from '@/app/_components/Logo/Logo'
import { SearchInput } from '@/app/_components/SearchInput/SearchInput'
import { CategoryContext } from '@/app/contexts/CategoryContext/CategoryContext'

export const Header: React.FC = () => {
  const { handleSearchChange } = useContext(CategoryContext)

  return (
    <header className="flex flex-col items-center py-18 sm:flex-row sm:justify-between">
      <Logo />
      <SearchInput onSearchChange={handleSearchChange} />
    </header>
  )
}
