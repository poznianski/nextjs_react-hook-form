import Image from 'next/image'
import React from 'react'

import { Text } from '@/app/_components/Text/Text'

export const Button: React.FC = () => {
  return (
    <button className="w-full bg-gradient-purple h-[50px] rounded inline-flex items-center justify-center gap-2 hover:bg-gradient-purple-reversed active:bg-someColor transition-all ease-in-out hover:delay-1000">
      <Image
        src="/icons/plus.svg"
        alt="plus"
        width={14}
        height={14}
      />

      <Text className="text-white font-bold">Create a Category</Text>
    </button>
  )
}
