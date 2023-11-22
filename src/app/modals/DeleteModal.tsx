import React, { useRef } from 'react'

import { Button } from '@/app/_components/Button/Button'
import { Text } from '@/app/_components/Text/Text'
import { useClickOutside } from '@/app/hooks/useClickOutside'

interface IDeleteModal {
  onClose: () => void
  onConfirm: () => void
}

export const DeleteModal: React.FC<IDeleteModal> = ({ onClose, onConfirm }) => {
  const modalRef = useRef(null)
  useClickOutside(modalRef, onClose)

  return (
    <>
      <div
        className="modal-backdrop"
        onClick={onClose}
      ></div>

      <div
        className="fixed left-1/2 top-1/2 z-10 flex translate-x-[-50%] translate-y-[-50%] items-center justify-center bg-greyDelete p-6"
        ref={modalRef}
      >
        <div className="flex w-[286px] flex-col gap-6">
          <h3 className="text-center text-white">Delete the Category?</h3>

          <Text className="text-center text-white">
            All templates in the category will be moved to the category
            &quot;Other&quot;
          </Text>

          <Button
            name={'Delete'}
            icon="delete"
            color="purple"
            onClick={onConfirm}
          />

          <Button
            name={'Cancel'}
            color="none"
            className="text-red"
            onClick={onClose}
          />
        </div>
      </div>
    </>
  )
}
