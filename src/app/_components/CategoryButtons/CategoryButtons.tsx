import Image from 'next/image'
import React from 'react'

interface ICategoryButtons {
  isOn: boolean
  onDelete?: () => void
}

export const CategoryButtons: React.FC<ICategoryButtons> = ({
  isOn,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-5">
      <Image
        src={isOn ? 'icons/on.svg' : 'icons/off.svg'}
        alt="tumbler"
        width="47"
        height="26"
      />

      <button onClick={onDelete}>
        <Image
          src={'icons/delete.svg'}
          alt="delete"
          width="10"
          height="12"
          className="hover:scale-125"
        />
      </button>

      <Image
        src={'icons/dnd.svg'}
        alt="drag and drop"
        width="8"
        height="13"
      />
    </div>
  )
}
