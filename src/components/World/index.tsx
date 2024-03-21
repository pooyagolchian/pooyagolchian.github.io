import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const World: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer
    let galaxy: THREE.Group

    const initGalaxy = () => {
      galaxy = new THREE.Group()
      const planetGeometry = new THREE.SphereGeometry(1, 32, 32)
      const colors = [
        0x4287f5, 0x42f584, 0xf54242, 0xf5f242, 0x42f5f2, 0xff00ff, 0xffa500,
        0x800080, 0x008080, 0xff6347, 0x00ff00, 0xff69b4, 0x0000ff, 0xffff00,
        0xff00ff, 0x00ffff, 0x7fffd4, 0x800000, 0x008000, 0x000080,
      ]

      for (let i = 0; i < 9000; i++) {
        const material = new THREE.MeshBasicMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
        })
        const planet = new THREE.Mesh(planetGeometry, material)

        const layer = Math.floor(i / 700)
        const angle = Math.random() * Math.PI * 2
        const distance = 50 + Math.random() * (50 + layer * 100)
        const spiralArmOffset = (Math.random() - 0.5) * 50
        const x = Math.cos(angle) * distance + spiralArmOffset
        const y = layer * 12 - 30
        const z = Math.sin(angle) * distance + spiralArmOffset

        planet.position.set(x, y, z)
        galaxy.add(planet)
      }
      scene.add(galaxy)
    }

    const handleScroll = () => {
      const scroll = window.scrollY
      const title = document.querySelector('.title') as HTMLElement
      title.style.transform = `translate(-50%, calc(-50% + ${scroll / 3}px))`
      title.style.fontSize = `${60 + scroll / 10}px`
    }

    const init = (): void => {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(
        4000,
        window.innerWidth / window.innerHeight,
        50,
        1000000
      )
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      sceneRef.current?.appendChild(renderer.domElement)

      initGalaxy()

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.maxDistance = 500
      controls.minDistance = 500
      camera.position.z = 700
      controls.enableZoom = false
      controls.enablePan = false

      animate()

      window.addEventListener('scroll', handleScroll)
    }

    const animate = (): void => {
      requestAnimationFrame(animate)

      galaxy.rotation.x += 0.004
      galaxy.rotation.y += 0.004

      renderer.render(scene, camera)
    }

    init()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={sceneRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <div
        className="title"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '100px',
          textAlign: 'center',
          width: '100%',
          fontWeight: 'bold',
        }}
      >
        Design, Build, Ship
      </div>
    </div>
  )
}

export default World
