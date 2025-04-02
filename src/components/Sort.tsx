'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select'
import { sortTypes } from '@/src/constants'
import { usePathname, useRouter } from 'next/navigation'

const Sort = () => {
  const path = usePathname()
  const router = useRouter()
  const handleSort = (value: string) => {
    console.log('Sorting by:', value)
    router.push(`${path}?sort=${value}`)
  }

  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
      <SelectTrigger className='sort-select'>
        <SelectValue placeholder={sortTypes[0].value} />
      </SelectTrigger>
      <SelectContent className='sort-select-content'>
        {sortTypes.map((sort) => (
          <SelectItem key={sort.label} className='shad-select-item' value={sort.value}>
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default Sort
