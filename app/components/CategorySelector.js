'use client'

import React from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'

const CategorySelector = ({ value, onChange, categories }) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger 
        className="w-36 flex items-center justify-between px-3 py-1 bg-transparent border border-gray-300 bg-gray-50 rounded-md focus:outline-none text-sm"
        aria-label="Select category"
      >
        <Select.Value placeholder="Select category" />
        <Select.Icon>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg mt-10 w-36 ml-6">
          <Select.Viewport className="p-1">
            <Select.Group>
              {categories.map((category, idx) => (
                <Select.Item
                  key={idx}
                  value={category}
                  className="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md select-none hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  <Select.ItemText>{category}</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default CategorySelector