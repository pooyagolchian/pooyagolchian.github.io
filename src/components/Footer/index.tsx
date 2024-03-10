import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { footerColumns } from './footerData'

gsap.registerPlugin(ScrollTrigger)

const Footer: React.FC = () => {
  const containerFooterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerFooterRef.current) {
      gsap.from(containerFooterRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: containerFooterRef.current,
          start: 'top 90%',
          toggleActions: 'restart none none none',
        },
      })
    }
  }, [])

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const { target } = event.currentTarget
    if (target && target.getAttribute('data-type') === 'external') {
      target.setAttribute('rel', 'noOpener noReferrer')
    }
  }

  return (
    <footer
      className="container mx-auto grid grid-cols-4 gap-4 text-white py-8"
      ref={containerFooterRef}
      style={{ minHeight: '500px' }} // Example height, adjust as needed
    >
      {footerColumns.map((column, index) => (
        <div key={index} className="column">
          <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
          <ul>
            {column.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a
                  href={link.url}
                  className="text-gray-300 hover:text-white"
                  target={link.type === 'external' ? '_blank' : undefined}
                  rel={
                    link.type === 'external' ? 'noOpener noReferrer' : undefined
                  }
                  datatype={link.type}
                  onClick={handleLinkClick}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  )
}

export default Footer
