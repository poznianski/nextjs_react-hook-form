import React from 'react'

import { Button } from '@/app/_components/Button/Button'
import { Category } from '@/app/_components/Category/Category'

export const CategoriesList: React.FC = () => {
  return (
    <div className="flex flex-col max-w-[638px] min-w-[250px] w-full mx-auto px-4 pt-10 gap-3">
      <Button />
      <Category
        name="ASdasdasdasd"
        isOn={true}
      />
      <Category
        name="ASdasdasdasd"
        isOn={true}
      />
      <Category
        name="ASdasdasdasd"
        isOn={false}
      />
      <Category
        name="ASdasdasdasd"
        isOn={true}
      />
      <Category
        name="ASdasdasdasd"
        isOn={false}
      />
    </div>
  )
}
