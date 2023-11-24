'use client'
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

  return (
    <div
      className="mx-auto flex w-full min-w-[250px] max-w-[638px] flex-col
     gap-3 px-4 pt-10"
    >
      <Button
        onClick={openForm}
        name={'Create a category'}
        icon="plus"
        color="purple"
      />

      {showForm && (
        <CategoryForm
          addCategory={addCategory}
          closeForm={closeForm}
        />
      )}

      {filteredCategories.map((category) => (
        <Category
          key={category.id}
          {...category}
          onDelete={() => handleDeleteClick(category.id)}
          onToggle={() => toggleCategoryOn(category.id)}
        />
      ))}

      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => confirmDelete(selectedCategory as string)}
        />
      )}
    </div>
  )
}
