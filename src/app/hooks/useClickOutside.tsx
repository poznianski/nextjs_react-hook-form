import { RefObject, useEffect } from 'react'

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handleClick: () => void,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).classList.contains('dropdown-item')
      ) {
        handleClick()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handleClick])
}
