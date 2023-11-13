import React from 'react'

import { Logo } from '@/app/_components/Logo/Logo'
import { SearchInput } from '@/app/_components/SearchInput/SearchInput'

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between py-18 border-b border-b-1 border-greyLight">
      <Logo />
      <SearchInput />
    </header>
  )
}
