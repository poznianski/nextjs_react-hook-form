'use client'
import React from 'react'

import { CategoryButtons } from '@/app/_components/CategoryButtons/CategoryButtons'
import { Text } from '@/app/_components/Text/Text'

export interface ICategory {
  id: string
  name: string
  isOn: boolean
}

export interface ICategoryActions extends ICategory {
  onDelete?: (id: string) => void
  onToggle?: (id: string) => void
}
export const Category: React.FC<ICategoryActions> = ({
  name,
  isOn,
  id,
  onDelete,
  onToggle,
}) => {
  const base = id === 'other'

  return (
    <div
      className="mb-2 flex h-[50px] justify-between rounded
    border-2 border-categoryBorder bg-categoryBg px-5 py-3"
    >
      <Text className="text-white">{name}</Text>

      <CategoryButtons
        isOn={isOn}
        onDelete={() => (onDelete ? onDelete(id) : undefined)}
        onToggle={() => (onToggle ? onToggle(id) : undefined)}
        base={base}
        id={id}
      />
    </div>
  )
}
