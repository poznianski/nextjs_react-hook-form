import Image from 'next/image'
import React from 'react'

export const SearchInput: React.FC = () => {
  return (
    <div className="relative w-[340px] h-[40px]">
      <input
        placeholder="Search"
        className="bg-grey py-2.5 px-5 rounded pr-10 w-full outline-none"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <Image
          alt="search icon"
          src="/icons/search.svg"
          width={20}
          height={20}
        />
      </div>
    </div>
  )
}
