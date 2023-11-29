'use client'
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import React, { useContext, useEffect, useState } from 'react'

import { Button } from '@/app/_components/Button/Button'
import { Category, ICategory } from '@/app/_components/Category/Category'
import { CategoryForm } from '@/app/_components/CategoryForm/CategoryForm'
import { SortableItem } from '@/app/_components/SortableItem/SortableItem'
import { CategoryContext } from '@/app/contexts/CategoryContext/CategoryContext'
import { DeleteModal } from '@/app/modals/DeleteModal'

export const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [showForm, setShowForm] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [othersIsOn, setOthersIsOn] = useState(true)
  const { searchQuery } = useContext(CategoryContext)

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  )

  const openForm = () => {
    setShowForm(true)
  }

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories')

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories))
    }
  }, [setCategories])

  const addCategory = (newCategory: ICategory) => {
    const updatedCategories = [...categories, newCategory]
    setCategories(updatedCategories)

    localStorage.setItem('categories', JSON.stringify(updatedCategories))
  }

  const confirmDelete = (categoryId: string) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId,
    )

    setCategories(updatedCategories)
    localStorage.setItem('categories', JSON.stringify(updatedCategories))
    setShowDeleteModal(false)
  }

  const handleDeleteClick = (categoryId: string) => {
    console.log('delete pressed')
    setSelectedCategory(categoryId)
    setShowDeleteModal(true)
  }

  const toggleCategoryOn = (categoryId: string) => {
    console.log('toggle pressed')
    const updatedCategories = categories.map((category) =>
      categoryId === category.id
        ? { ...category, isOn: !category.isOn }
        : category,
    )

    setCategories(updatedCategories)
    localStorage.setItem('categories', JSON.stringify(updatedCategories))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setCategories((categories) => {
        const oldIndex = categories.findIndex(
          (category) => category.id === active.id,
        )
        const newIndex = categories.findIndex(
          (category) => category.id === over.id,
        )
        return arrayMove(categories, oldIndex, newIndex)
      })
    }
  }

  const toggleOthersOn = () => {
    setOthersIsOn(!othersIsOn)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <div className="container mx-auto flex w-full min-w-[250px] max-w-[638px] flex-col px-4 pt-10 sm:px-6 lg:px-8">
        <Button
          onClick={() => setShowForm(true)}
          name={'Create a category'}
          icon="plus"
          color="purple"
          className="mb-3"
        />

        {showForm && (
          <CategoryForm
            addCategory={addCategory}
            closeForm={() => setShowForm(false)}
          />
        )}

        <SortableContext
          items={categories.map((category) => category.id)}
          strategy={verticalListSortingStrategy}
        >
          {categories
            .filter((category) =>
              category.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((category) => (
              <SortableItem
                id={category.id}
                key={category.id}
              >
                <Category
                  key={category.id}
                  {...category}
                  onDelete={(e) => handleDeleteClick(category.id)}
                  onToggle={(e) => toggleCategoryOn(category.id)}
                />
              </SortableItem>
            ))}
        </SortableContext>

        <Category
          id={'other'}
          name={'Other'}
          isOn={othersIsOn}
          onToggle={toggleOthersOn}
        />

        {showDeleteModal && (
          <DeleteModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => confirmDelete(selectedCategory as string)}
          />
        )}
      </div>
    </DndContext>
  )
}
