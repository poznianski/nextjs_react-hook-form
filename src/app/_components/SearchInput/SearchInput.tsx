import Image from 'next/image'
import React from 'react'

export interface ISearchInput {
  onSearchChange: () => void
}

export const SearchInput: React.FC<ISearchInput> = ({ onSearchChange }) => {
  return (
    <div className="w-full min-w-[280px] max-w-[380px]">
      <div className="relative h-10">
        <input
          placeholder="Search"
          className="w-full rounded bg-grey px-5 py-2.5 pr-10 text-white outline-none placeholder:text-white"
          onChange={onSearchChange}
        />

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <Image
            alt="search icon"
            src="/icons/search.svg"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  )
}
