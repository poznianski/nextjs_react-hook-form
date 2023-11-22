import React, { useRef } from 'react'

import { Button } from '@/app/_components/Button/Button'
import { Text } from '@/app/_components/Text/Text'
import { useClickOutside } from '@/app/hooks/useClickOutside'

interface IDeleteModal {
  onClose: () => void
}

export const DeleteModal: React.FC<IDeleteModal> = ({ onClose, onConfirm }) => {
  const modalRef = useRef(null)
  useClickOutside(modalRef, onClose)

  return (
    <div
      className="bg-greyDelete p-6"
      ref={modalRef}
    >
      <h3>Delete the Category?</h3>

      <Text>
        All templates in the category will be moved to the category
        &quotOther&quot
      </Text>

      <Button
        name={'Delete'}
        icon="delete"
        color="purple"
      />

      <Text className="text-red">Cancel</Text>
    </div>
  )
}
