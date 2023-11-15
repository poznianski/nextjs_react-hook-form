import Image from 'next/image'
import React from 'react'

import { Text } from '@/app/_components/Text/Text'

interface ICategory {
  name: string
  isOn: boolean
}

export const Category: React.FC<ICategory> = ({ name, isOn = false }) => {
  return (
    <div className="rounded h-[50px] border-2 border-categoryBorder bg-categoryBg px-5 py-3">
      <div className="flex justify-between">
        <Text className="text-white">{name}</Text>

        <div className="flex gap-5 items-center">
          <Image
            src={isOn ? 'icons/on.svg' : 'icons/off.svg'}
            alt="tumbler"
            width="47"
            height="26"
          />

          <Image
            src={'icons/delete.svg'}
            alt="delete"
            width="10"
            height="12"
          />
          <Image
            src={'icons/dnd.svg'}
            alt="drag and drop"
            width="8"
            height="13"
          />
        </div>
      </div>
    </div>
  )
}
