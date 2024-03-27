import React from 'react'
import clsx from 'clsx'

interface TagsProps {
  tags: string[]
}

const randomGradientClass = () => {
  const gradientClasses = [
    'bg-gradient-to-br from-green-400 to-blue-500',
    'bg-gradient-to-br from-purple-400 to-indigo-500',
    'bg-gradient-to-br from-pink-400 to-rose-500',
    'bg-gradient-to-br from-yellow-400 to-red-500',
    'bg-gradient-to-br from-blue-400 to-indigo-500',
    'bg-gradient-to-br from-indigo-400 to-purple-500',
    'bg-gradient-to-br from-red-400 to-yellow-500',
    'bg-gradient-to-br from-green-400 to-emerald-500',
    'bg-gradient-to-br from-fuchsia-400 to-purple-500',
  ]
  const randomIndex = Math.floor(Math.random() * gradientClasses.length)
  return gradientClasses[randomIndex]
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {tags?.map((tag: string) => (
        <a
          key={tag}
          href={`/tags/${tag}`}
          className={clsx(
            'rounded-2xl h-32 flex justify-center items-center text-center py-2 px-4 text-white bg-blur h5',
            randomGradientClass()
          )}
        >
          {tag}
        </a>
      ))}
    </div>
  )
}

export default Tags
