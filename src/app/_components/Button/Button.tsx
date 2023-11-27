import Image from 'next/image'
import React from 'react'

import { Text } from '@/app/_components/Text/Text'

interface IButton {
  onClick?: () => void
  name: string
  className?: string
  style?: string
  icon?: 'plus' | 'delete' | 'edit' | 'success'
  color: 'purple' | 'green' | 'danger' | 'none'
  type?: 'button' | 'submit'
  danger?: boolean
  border?: boolean
}

export const Button: React.FC<IButton> = ({
  onClick,
  name,
  className,
  icon,
  color,
  type = 'submit',
  danger,
  border,
}) => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'delete':
        return '/icons/delete.svg'
      case 'dnd':
        return '/icons/dnd.svg'
      case 'plus':
        return '/icons/plus.svg'
      case 'success':
        return '/icons/check-circle.svg'
      default:
        return ''
    }
  }

  const getBg = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green'
      case 'danger':
        return 'bg-danger'
      case 'purple':
        return 'bg-gradient-purple'
      default:
        return ''
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex h-[50px] w-full items-center justify-center gap-2
       rounded ${getBg(color)} transition-all ease-in-out
       hover:bg-gradient-purple-reversed hover:delay-1000 ${className} ${
         border ? 'border-greyBorder border-2' : ''
       }`}
    >
      {icon && (
        <Image
          src={getIcon(icon)}
          alt={icon}
          width={14}
          height={14}
        />
      )}

      <Text className={`${danger ? 'text-red' : 'font-bold text-whiteSuper'}`}>
        {name}
      </Text>
    </button>
  )
}
