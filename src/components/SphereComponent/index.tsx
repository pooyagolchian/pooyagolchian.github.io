import React, { useRef, useEffect } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { Mesh, Color } from 'three'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

extend({ OrbitControls })

const SphereWireframe = () => {
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
  useEffect(() => {
    gsap.to('.scroll-text', {
      y: 200, // Move down by 200px
      fontSize: '160px', // Increase font size
      scrollTrigger: {
        trigger: '.scroll-text',
        start: 'top top', // Trigger animation when the top of the text comes into view
        end: 'bottom bottom', // Trigger animation when the bottom of the text goes out of view
        scrub: true, // Smooth animation with scroll
      },
    })
  }, [])

  const textStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '40px',
    transition: 'font-size 0.5s, transform 0.5s',
    width: '100%',
    textAlign: 'center',
  }

  return (
    <div style={{ position: 'relative' }}>
      <Canvas
        className={'h-screen w-screen py-32 h-100'}
        style={{ height: '1000px' }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <SphereWireframe />
      </Canvas>
      <div className="scroll-text font-extrabold" style={textStyle}>
        Think out of box
      </div>
    </div>
  )
}

export default SphereComponent
