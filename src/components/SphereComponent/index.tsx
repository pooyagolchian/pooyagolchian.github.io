import React, { useRef, useEffect, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { Mesh, Color } from 'three'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import styles from './styles.module.scss'
import clsx from 'clsx'

extend({ OrbitControls })

interface SphereWireframeProps {
  fontSize: string
}

const SphereWireframe = ({ fontSize }: SphereWireframeProps) => {
  const meshRef = useRef<Mesh>()
  const {
    camera,
    gl: { domElement },
  } = useThree()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <>
      <mesh ref={meshRef} scale={[3, 3, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          attach="material"
          wireframe
          uniforms={{
            color1: { value: new Color(0xff0000) },
            color2: { value: new Color(0x0000ff) },
          }}
          vertexShader={`
            varying vec3 vPosition;
            void main() {
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec3 vPosition;
            void main() {
              gl_FragColor = vec4(mix(color1, color2, vPosition.y + 0.5), 1.0);
            }
          `}
        />
      </mesh>
      <OrbitControls enableZoom={false} args={[camera, domElement]} />
    </>
  )
}

const SphereComponent = () => {
  const [fontSize, setFontSize] = useState('40px') // Initial font size for desktop

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to('.scroll-text', {
      y: 200,
      fontSize: fontSize,
      scrollTrigger: {
        trigger: '.scroll-text',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
  }, [fontSize])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setFontSize('140px')
      } else {
        setFontSize('60px') // Adjust the font size for smaller screens
      }
    }

    // Initial call to set font size based on window width
    handleResize()

    // Event listener for window resize
    window.addEventListener('resize', handleResize)

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <Canvas
        className={'h-screen w-screen py-32 h-100'}
        style={{ height: '1000px' }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <SphereWireframe fontSize={fontSize} />
      </Canvas>
      <div
        className={clsx(
          'scroll-text font-extrabold hidden md:flex',
          styles.textStyle
        )}
      >
        Think out of box
      </div>
    </div>
  )
}

export default SphereComponent
