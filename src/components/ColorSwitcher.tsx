'use client'
import { useEffect, useState } from 'react'
import { Settings } from 'lucide-react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover'

const colors = [
  { name: 'Red', rgb: '250, 114, 117' },
  { name: 'Blue', rgb: '59, 130, 246' },
  { name: 'Green', rgb: '16, 185, 129' },
  { name: 'Purple', rgb: '139, 92, 246' },
  { name: 'Orange', rgb: '249, 115, 22' },
]

export default function ColorSwitcher() {
  const [selectedColor, setSelectedColor] = useState<string>('250, 114, 117')

  useEffect(() => {
    const storedColor = localStorage.getItem('brandColor')
    if (storedColor) {
      setSelectedColor(storedColor)
      document.documentElement.style.setProperty('--brand-color', storedColor)
    }
  }, [])

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    localStorage.setItem('brandColor', color)
    document.documentElement.style.setProperty('--brand-color', color)
  }

  return (
    <div className='absolute bottom-5 right-5 z-50'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className='rounded-full p-2'>
            <Settings className='w-5 h-5' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-40 flex flex-wrap gap-2 p-3'>
          {colors.map((color) => (
            <button
              key={color.name}
              className='w-8 h-8 rounded-full border-2 transition-all'
              style={{
                backgroundColor: `rgb(${color.rgb})`,
                borderColor: selectedColor === color.rgb ? 'black' : 'transparent',
              }}
              onClick={() => handleColorChange(color.rgb)}
            />
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
}
