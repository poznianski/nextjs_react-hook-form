'use client'
import React, { ReactNode, useState } from 'react'

export const CategoryContext = React.createContext<any>(undefined)

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const value = { handleSearchChange, searchQuery, setSearchQuery }

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  )
}
