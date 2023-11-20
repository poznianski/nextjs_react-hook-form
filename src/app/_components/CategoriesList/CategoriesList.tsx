'use client'
import React, { useEffect, useState } from 'react'

import { Button } from '@/app/_components/Button/Button'
import { Category, ICategory } from '@/app/_components/Category/Category'
import { CategoryForm } from '@/app/_components/CategoryForm/CategoryForm'

export const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [showForm, setShowForm] = useState<boolean>(false)

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

  return (
    <div className="mx-auto flex w-full min-w-[250px] max-w-[638px] flex-col gap-3 px-4 pt-10">
      <Button
        onClick={openForm}
        name={'Create a category'}
        icon="plus"
        color="purple"
      />

      {showForm && <CategoryForm addCategory={addCategory} />}

      {categories.map((category, index) => (
        <Category
          key={index}
          {...category}
        />
      ))}
    </div>
  )
}
