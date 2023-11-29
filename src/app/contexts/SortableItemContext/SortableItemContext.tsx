import { DraggableSyntheticListeners } from '@dnd-kit/core'
import React from 'react'

interface Context {
  attributes: Record<string, any>
  listeners: DraggableSyntheticListeners
  ref(node: HTMLElement | null): void
}

const SortableItemContext = React.createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
})

export default SortableItemContext
