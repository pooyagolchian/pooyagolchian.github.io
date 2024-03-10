import React from 'react'
import Marquee from 'react-fast-marquee'

interface ImageProps {
  id: number
  basePath: string
}

interface MarqueeWithImagesProps {
  imageCount?: number
  basePath?: string
}

const MarqueeWithImages = ({
  imageCount = 31,
  basePath = '/images/framework-logo/',
}: MarqueeWithImagesProps) => {
  const images: ImageProps[] = []

  for (let i = 1; i <= imageCount; i++) {
    images.push({ id: i, basePath: `${basePath}${i}` })
  }

  return (
    <Marquee
      className="py-32"
      direction="left"
      speed={300}
      style={{ width: '100%', overflowX: 'scroll' }} // Adjust overflow to scroll
    >
      <div className="flex">
        {images.map((image) => (
          <img
            key={image.id}
            src={`${image.basePath}.svg`}
            alt={`SVG Image ${image.id}`}
            width="100"
            height="100"
            className="mr-16"
          />
        ))}
      </div>
    </Marquee>
  )
}

export default MarqueeWithImages
