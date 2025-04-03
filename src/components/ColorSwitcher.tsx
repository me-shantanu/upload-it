'use client'
import { useEffect, useState } from 'react'
import { Settings } from 'lucide-react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover'
import { themeColors } from '../constants'

export default function ColorSwitcher() {
  const [selectedColor, setSelectedColor] = useState<string>('139, 92, 246')

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
          {themeColors.map((color) => (
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
