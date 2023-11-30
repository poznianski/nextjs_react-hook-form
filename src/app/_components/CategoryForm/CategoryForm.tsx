import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '@/app/_components/Button/Button'
import { ICategory } from '@/app/_components/Category/Category'
import { CategoryButtons } from '@/app/_components/CategoryButtons/CategoryButtons'

interface ICategoryForm {
  addCategory: (category: ICategory) => void
  closeForm: () => void
}

export const CategoryForm: React.FC<ICategoryForm> = ({
  addCategory,
  closeForm,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategory>()

  const onSubmit = async (data: ICategory) => {
    try {
      const newCategory = {
        ...data,
        id: uuidv4(),
        isOn: false,
      }

      const response = await axios.post('/api/categories', newCategory)
      const savedCategory = response.data

      addCategory(savedCategory)

      reset()
      closeForm()
    } catch (error) {
      console.error('Failed to create category', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`mb-3 flex h-[50px] items-center justify-between rounded 
      border-2 border-categoryBorder bg-categoryBg px-5 py-3 ${
        errors.name ? 'border-red' : ''
      }`}
      >
        <input
          {...register('name', { required: 'Name cannot be empty' })}
          placeholder="Enter Category Name"
          className="bg-categoryBg text-white outline-none"
        />

        <CategoryButtons />
      </div>

      {errors.name && <p className="m-1 text-red">{errors.name.message}</p>}

      <div className="bg-gre fixed bottom-0 left-0 w-screen bg-greyCancel py-5">
        <div className="container mx-auto flex flex-col gap-2 px-5 sm:flex-row sm:gap-6.5">
          <Button
            name="Save Changes"
            icon="success"
            color="green"
            className="h-[60px]"
          />

          <Button
            type="button"
            onClick={closeForm}
            name="Cancel"
            className="h-[60px]"
            color="none"
            border
          />
        </div>
      </div>
    </form>
  )
}
