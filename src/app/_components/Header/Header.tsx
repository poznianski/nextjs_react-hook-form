import React from 'react'

import { Logo } from '@/app/_components/Logo/Logo'
import { SearchInput } from '@/app/_components/SearchInput/SearchInput'

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center sm:flex-row sm:justify-between py-18">
      <Logo />
      <SearchInput />
    </header>
  )
}
