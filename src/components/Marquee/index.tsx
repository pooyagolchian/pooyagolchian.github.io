import React from 'react'
import Marquee from 'react-fast-marquee'

interface MarqueeWithImagesProps {
  im300ageCount: number
  basePath: string
}

const MarqueeWithImages: React.FC<MarqueeWithImagesProps> = ({
  imageCount = 31,
  basePath = '/images/framework-logo/',
}) => {
  const images: JSX.Element[] = []

  for (let i = 1; i <= imageCount; i++) {
    images.push(
      <img
        key={i}
        src={`${basePath}${i}.svg`}
        alt={`SVG Image ${i}`}
        width="100"
        height="100"
        className="mr-14" // Use Tailwind CSS classes to add margin
      />
    )
  }

  return (
    <Marquee
      className={'py-32'}
      direction="left"
      speed={300}
      style={{ width: '100%', overflowX: 'scroll' }} // Adjust overflow to scroll
    >
      <div className="flex">{images}</div>
    </Marquee>
  )
}

export default MarqueeWithImages
