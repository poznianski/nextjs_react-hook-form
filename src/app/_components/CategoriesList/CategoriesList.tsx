'use client'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'
import React, { useContext, useEffect, useState } from 'react'

import { Button } from '@/app/_components/Button/Button'
import { Category, ICategory } from '@/app/_components/Category/Category'
import { CategoryForm } from '@/app/_components/CategoryForm/CategoryForm'
import { CategoryContext } from '@/app/contexts/CategoryContext/CategoryContext'
import { DeleteModal } from '@/app/modals/DeleteModal'

export const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [showForm, setShowForm] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { searchQuery } = useContext(CategoryContext)

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const openForm = () => {
    setShowForm(true)
  }

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories')

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories))
    }
  }, [])

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
    setSelectedCategory(categoryId)
    setShowDeleteModal(true)
  }

  const closeForm = () => {
    setShowForm(false)
  }

  const toggleCategoryOn = (categoryId: string) => {
    const updatedCategories = categories.map((category) =>
      categoryId === category.id
        ? { ...category, isOn: !category.isOn }
        : category,
    )

    setCategories(updatedCategories)
    localStorage.setItem('categories', JSON.stringify(updatedCategories))
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const reorderedCategories = Array.from(categories)
    const [removed] = reorderedCategories.splice(result.source.index, 1)
    reorderedCategories.splice(result.destination.index, 0, removed)

    reorderedCategories.forEach((cat, index) => {
      cat.order = index
    })

    setCategories(reorderedCategories)
    localStorage.setItem('categories', JSON.stringify(reorderedCategories))
  }

  const getStyle = () => ({ marginBottom: '12px' })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mx-auto flex w-full min-w-[250px] max-w-[638px] flex-col gap-3 px-4 pt-10">
        <Button
          onClick={openForm}
          name={'Create a category'}
          icon="plus"
          color="purple"
        />

        {showForm ? (
          <CategoryForm
            addCategory={addCategory}
            closeForm={closeForm}
          />
        ) : (
          <div style={{ display: 'none' }}>
            <CategoryForm
              addCategory={addCategory}
              closeForm={closeForm}
            />
          </div>
        )}

        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              // className="flex flex-col gap-3"
            >
              {categories.map((category, index) => (
                <Draggable
                  key={category.id}
                  draggableId={category.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // style={getStyle()}
                    >
                      <Category
                        {...category}
                        onDelete={() => handleDeleteClick(category.id)}
                        onToggle={() => toggleCategoryOn(category.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {showDeleteModal && (
          <DeleteModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => confirmDelete(selectedCategory as string)}
          />
        )}
      </div>
    </DragDropContext>
  )
}
