import Image from 'next/image'
import React from 'react'

interface ICategoryButtons {
  isOn?: boolean
  onDelete?: () => void
  onToggle?: () => void
  base?: boolean
}

export const CategoryButtons: React.FC<ICategoryButtons> = ({
  isOn,
  onDelete,
  onToggle,
  base,
}) => {
  return (
    <div className="flex items-center gap-5">
      <button onClick={onToggle}>
        <Image
          src={isOn ? 'icons/on.svg' : 'icons/off.svg'}
          alt="tumbler"
          width="47"
          height="26"
        />
      </button>

      {!base && (
        <div className="flex gap-5">
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
      )}
    </div>
  )
}
