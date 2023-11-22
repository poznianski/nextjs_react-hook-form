'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Button } from '@/app/_components/Button/Button'
import { Category, ICategory } from '@/app/_components/Category/Category'
import { CategoryForm } from '@/app/_components/CategoryForm/CategoryForm'
import { DeleteModal } from '@/app/modals/DeleteModal'

export const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [showForm, setShowForm] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

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

  const handleClose = () => {
    setShowDeleteModal(false)
  }

  const confirmDelete = async () => {
    if (selectedCategory !== null) {
      try {
        await axios.delete(`/api/categories/${selectedCategory}`)

        const updatedCategories = categories.filter(
          (category) => category.id !== selectedCategory,
        )
        setCategories(updatedCategories)
        localStorage.setItem('categories', JSON.stringify(updatedCategories))

        setShowDeleteModal(false)
      } catch (error) {
        console.error('Failed to delete category', error)
      }
    }
  }

  const closeForm = () => {
    setShowForm(false)
  }

  return (
    <div className="mx-auto flex w-full min-w-[250px] max-w-[638px] flex-col gap-3 px-4 pt-10">
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

      {categories.map((category, index) => (
        <Category
          key={index}
          {...category}
        />
      ))}

      {showDeleteModal && (
        <DeleteModal
          onClose={handleClose}
          onDelete={confirmDelete}
        />
      )}
    </div>
  )
}
