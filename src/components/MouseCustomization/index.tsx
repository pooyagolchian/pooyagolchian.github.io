import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import clsx from 'clsx'
import styles from './CustomMouse.module.scss'

const CustomMouse = () => {
  const mouseRef = useRef<HTMLDivElement>(null)
  const [linkHovered, setLinkHovered] = useState(false)
  const mousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mouse = mouseRef.current
    if (!mouse) return

    const pulseTL = gsap.timeline({ repeat: -1 })
    pulseTL
      .to(mouse, { scale: 1.2, duration: 0.5, ease: 'power2.inOut' })
      .to(mouse, { scale: 1, duration: 0.5, ease: 'power2.inOut' })

    const waveTL = gsap.timeline({ repeat: -1 })
    waveTL
      .to(mouse, { rotation: 10, duration: 1, ease: 'power2.inOut' })
      .to(mouse, { rotation: -10, duration: 1, ease: 'power2.inOut' })
      .to(mouse, { rotation: 0, duration: 1, ease: 'power2.inOut' })

    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  useEffect(() => {
    const mouse = mouseRef.current
    if (!mouse) return

    gsap.set(mouse, { visibility: 'visible' })
  }, [])

  useEffect(() => {
    const handleHrefChange = () => {
      setLinkHovered(false)
      setTimeout(() => {
        if (window.location.href.includes('yourTargetPage')) {
          setLinkHovered(true)
        }
      }, 100)
    }

    const links = document.querySelectorAll('a')

    links.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        setLinkHovered(true)
      })
      link.addEventListener('mouseleave', () => {
        setLinkHovered(false)
      })
    })

    window.addEventListener('popstate', handleHrefChange)
    return () => {
      window.removeEventListener('popstate', handleHrefChange)
    }
  }, [])

  const onMouseMove = (e: MouseEvent) => {
    const mouse = mouseRef.current
    if (!mouse) return

    mousePosition.current.x = e.clientX
    mousePosition.current.y = e.clientY

    gsap.to(mouse, {
      x: mousePosition.current.x,
      y: mousePosition.current.y,
      duration: 0.5,
      ease: 'power3.out',
    })
  }

  return (
    <div
      ref={mouseRef}
      className={clsx(styles.customMouse, { [styles.blueMouse]: linkHovered })}
    />
  )
}

export default CustomMouse
