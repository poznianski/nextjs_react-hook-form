import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ReactNode, useMemo } from 'react'

import SortableItemContext from '@/app/contexts/SortableItemContext/SortableItemContext'

export const SortableItem = ({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id })

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  )

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <SortableItemContext.Provider value={context}>
      <div
        ref={setNodeRef}
        style={style}
      >
        {children}
      </div>
    </SortableItemContext.Provider>
  )
}
