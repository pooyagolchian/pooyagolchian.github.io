import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import data, { type Item } from './data'

const getRandomColor = (): string => {
  const colors = [
    '#4b0082',
    '#0000ff',
    '#00ff00',
    '#ffff00',
    '#ff7f00',
    '#ff0000',
    '#800080',
    '#ff1493',
    '#ff4500',
    '#7cfc00',
    '#00ced1',
    '#4682b4',
    '#20b2aa',
    '#f0e68c',
    '#dda0dd',
    '#00fa9a',
    '#87cefa',
    '#ba55d3',
    '#ff69b4',
    '#40e0d0',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const GitHub = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'restart none none none',
        },
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-4 gap-10">
      {data.map((item: Item, index: number) => {
        const gradientColor = getRandomColor()
        return (
          <div
            key={index}
            className="relative overflow-hidden p-4 rounded-xl shadow-md flex justify-center items-center"
            style={{
              minHeight: '200px',
              background: `linear-gradient(to bottom, ${gradientColor}, #800080)`,
              backdropFilter: 'blur(100px)',
              color: 'white',
            }}
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center w-full h-full p-3"
              style={{ textDecoration: 'none' }}
            >
              <span className="text-center font-semibold text-lg">
                {item.title}
              </span>
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default GitHub
