import Image from 'next/image'
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
      />

      <div
        className="fixed left-1/2 top-1/2 z-10 flex w-[300px] translate-x-[-50%]
         translate-y-[-50%] items-center justify-center rounded bg-greyDelete px-6 py-8 sm:w-[400px]"
        ref={modalRef}
      >
        <div className="flex flex-col gap-6">
          <div
            className="absolute right-7"
            onClick={onClose}
          >
            <Image
              src="icons/close.svg"
              alt="cross"
              width={10}
              height={10}
              className="cursor-pointer hover:scale-125"
            />
          </div>

          <Text className="text-center text-24 font-medium text-whiteSuper">
            Delete the Category?
          </Text>

          <div className="flex justify-center px-3">
            <Text className="text-center text-20 font-normal text-white">
              All templates in the category will be moved to the category
              &quot;Other&quot;
            </Text>
          </div>

          <div>
            <Button
              name="Delete"
              icon="delete"
              color="purple"
              onClick={onConfirm}
            />

            <Button
              name="Cancel"
              color="none"
              className="text-red"
              onClick={onClose}
              danger
            />
          </div>
        </div>
      </div>
    </>
  )
}
