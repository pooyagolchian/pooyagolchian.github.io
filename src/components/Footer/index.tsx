import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { footerColumns } from './footerData'

const Footer: React.FC = () => {
  const containerFooterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerFooterRef.current) {
      gsap.registerPlugin(ScrollTrigger)
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
      className="md:w-11/12 m-auto container px-5 md:px-0 w-full relative mb-5 mx-auto text-white py-12 flex flex-wrap justify-between"
      ref={containerFooterRef}
    >
      <div className="w-full md:w-1/2 pr-8 mb-8 md:mb-0">
        <h3>Pooya Golchian</h3>
        <p className={'text-sm'}>
          Hey there! Welcome to my cyber haven, where pixels dance to the tune
          of love and coffee, brewed right here in the heart of Dubai! 🌟 Armed
          with the coolest tech and a sprinkle of mathematical magic, I'm on a
          mission to transform 2D landscapes into vibrant 3D masterpieces. So,
          grab a cuppa and let's embark on this whimsical journey together! ☕✨
        </p>
        <h6>Let's send an email for work!</h6>
        <a href="mailto:info@pooya.blog">Send Email to info@pooya.blog</a>
      </div>
      <div className="w-full md:w-1/2 flex row justify-end">
        {footerColumns.map((column, index) => (
          <div key={index} className="mb-8 pl-12">
            <h3 className="h5 font-semibold mb-4">{column.title}</h3>
            <ul>
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href={link.url}
                    className="text-gray-600 text-lg hover:text-white"
                    target={link.type === 'external' ? '_blank' : undefined}
                    rel={
                      link.type === 'external'
                        ? 'noOpener noReferrer'
                        : undefined
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
      </div>
    </footer>
  )
}

export default Footer
