import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/app/_components/Button/Button'
import { ICategory } from '@/app/_components/Category/Category'
import { CategoryButtons } from '@/app/_components/CategoryButtons/CategoryButtons'

interface ICategoryForm {
  addCategory: (category: ICategory) => void
}

export const CategoryForm: React.FC<ICategoryForm> = ({ addCategory }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategory>()
  const [isOn, setIsOn] = useState(false)

  const onSubmit = async (data: ICategory) => {
    try {
      const response = await axios.post('/api/categories', data)
      const savedCategory = response.data
      addCategory(savedCategory)
      reset()
    } catch (error) {
      console.error('Failed to create category', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2 flex h-[50px] justify-between rounded border-2 border-categoryBorder bg-categoryBg px-5 py-3">
        <input
          {...register('name', { required: 'Name is required' })}
          placeholder="Enter Category Name"
          className="bg-categoryBg text-white outline-none"
        />

        <CategoryButtons />
      </div>

      {errors.name && <p>{errors.name.message}</p>}

      <div className="flex flex-col gap-2">
        <Button
          name={'Save Changes'}
          icon="success"
          color="green"
          className="h-[60px]"
        />
        <Button
          type="button"
          onClick={() => reset()}
          name={'Cancel'}
          className="h-[60px]"
          color="none"
        />
      </div>
    </form>
  )
}
