import Image from 'next/image'
import React from 'react'

export const Logo: React.FC = () => {
  return (
    <div className="flex gap-2.5 justify-items-center items-center">
      <Image
        src="/images/logo.svg"
        alt="logo"
        width={78}
        height={30}
      />
      <span className="text-32 text-white font-bold">Memes</span>
    </div>
  )
}
