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
      const id = uuidv4()

      const newCategory = {
        ...data,
        id,
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
        className={`mb-3 flex h-[50px] justify-between rounded 
      border-2 border-categoryBorder bg-categoryBg px-5 py-3 ${
        errors.name ? 'border-red' : ''
      }`}
      >
        <input
          {...register('name', { required: 'Name cannot be empty' })}
          placeholder="Enter Category Name"
          className="mb-2 bg-categoryBg text-white outline-none"
        />

        <CategoryButtons />
      </div>

      {errors.name && <p className="m-1 text-red">{errors.name.message}</p>}

      <div className="bg-gre bg-greyCancel fixed bottom-0 left-0 w-screen py-5">
        <div className="sm:gap-6.5 container mx-auto flex flex-col gap-2 sm:flex-row">
          <Button
            name={'Save Changes'}
            icon="success"
            color="green"
            className="h-[60px]"
          />

          <Button
            type="button"
            onClick={() => closeForm()}
            name={'Cancel'}
            className="h-[60px]"
            color="none"
            border
          />
        </div>
      </div>
    </form>
  )
}
