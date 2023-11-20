import React from 'react'

import { CategoryButtons } from '@/app/_components/CategoryButtons/CategoryButtons'
import { Text } from '@/app/_components/Text/Text'

export interface ICategory {
  name?: string
  isOn: boolean
}

export const Category: React.FC<ICategory> = ({ name, isOn }) => {
  return (
    <div className="flex h-[50px] justify-between rounded border-2 border-categoryBorder bg-categoryBg px-5 py-3">
      <Text className="text-white"> {name}</Text>

      <CategoryButtons />
    </div>
  )
}
