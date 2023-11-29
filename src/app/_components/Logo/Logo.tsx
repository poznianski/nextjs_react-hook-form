import Image from 'next/image'
import React, { useState } from 'react'

export const Logo: React.FC = () => {
  const [isImageVisible, setIsImageVisible] = useState(false)

  const toggleImage = () => {
    setIsImageVisible(!isImageVisible)
  }

  return (
    <div
      className="flex cursor-pointer items-center justify-items-center gap-2.5"
      onClick={toggleImage}
    >
      <Image
        src="/images/logo.svg"
        alt="logo"
        width={78}
        height={30}
        className=""
      />

      <span className="text-32 font-bold text-white">Memes</span>

      {isImageVisible && (
        <div className="meme">
          <Image
            src="/images/meme.webp"
            alt="logo"
            width={78}
            height={30}
          />
        </div>
      )}
    </div>
  )
}
