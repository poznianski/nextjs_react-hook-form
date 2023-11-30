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

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories')

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories))
    }
  }, [])

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  )

  const updateCategories = (updatedCategories: ICategory[]) => {
    setCategories(updatedCategories)
    localStorage.setItem('categories', JSON.stringify(updatedCategories))
  }

  const addCategory = (newCategory: ICategory) => {
    updateCategories([...categories, newCategory])
  }

  const confirmDelete = (categoryId: string) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId,
    )

    updateCategories(updatedCategories)
    setShowDeleteModal(false)
  }

  const handleDeleteClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setShowDeleteModal(true)
  }

  const toggleCategoryOn = (categoryId: string) => {
    const updatedCategories = categories.map((category) =>
      categoryId === category.id
        ? { ...category, isOn: !category.isOn }
        : category,
    )

    updateCategories(updatedCategories)
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
          name="Create a category"
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
            .map(({ id, ...rest }) => (
              <SortableItem
                id={id}
                key={id}
              >
                <Category
                  key={id}
                  id={id}
                  {...rest}
                  onDelete={() => handleDeleteClick(id)}
                  onToggle={() => toggleCategoryOn(id)}
                />
              </SortableItem>
            ))}
        </SortableContext>

        <Category
          id="other"
          name="Other"
          isOn={othersIsOn}
          onToggle={toggleOthersOn}
        />

        {showDeleteModal && selectedCategory && (
          <DeleteModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => confirmDelete(selectedCategory)}
          />
        )}
      </div>
    </DndContext>
  )
}
