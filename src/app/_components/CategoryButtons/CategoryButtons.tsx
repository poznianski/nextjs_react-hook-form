import Image from 'next/image'
import React, { useContext, useEffect } from 'react'

import SortableItemContext from '@/app/contexts/SortableItemContext/SortableItemContext'

interface ICategoryButtons {
  isOn?: boolean
  onDelete?: () => void
  onToggle?: () => void
  base?: boolean
  id: string
}

export const CategoryButtons: React.FC<ICategoryButtons> = ({
  isOn,
  onDelete,
  onToggle,
  base,
  id,
}) => {
  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    action: any,
  ) => {
    event.stopPropagation()
    event.preventDefault()
    action()
  }

  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <div className="flex items-center gap-5">
      <button
        onClick={(e) =>
          handleButtonClick(e, () => (onToggle ? onToggle() : undefined))
        }
      >
        <Image
          src={isOn ? 'icons/on.svg' : 'icons/off.svg'}
          alt="tumbler"
          width="47"
          height="26"
        />
      </button>

      {!base && (
        <div className="flex gap-5">
          <button
            onClick={(e) =>
              handleButtonClick(e, () => (onDelete ? onDelete() : undefined))
            }
          >
            <Image
              src={'icons/delete.svg'}
              alt="delete"
              width="10"
              height="12"
              className="hover:scale-125"
            />
          </button>

          <button
            ref={ref}
            {...attributes}
            {...listeners}
          >
            <Image
              src={'icons/dnd.svg'}
              alt="drag and drop"
              width="8"
              height="13"
              className="hover:scale-125"
            />
          </button>
        </div>
      )}
    </div>
  )
}
