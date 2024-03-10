import React, { useState } from 'react'
import clsx from 'clsx'
import menuItems from './menuItems.ts'

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:w-11/12 m-auto container py-5 mx-auto w-full relative mb-5">
      <div className="relative">
        <div
          className="flex justify-between flex-row lg:hidden cursor-pointer"
          onClick={toggleMenu}
        >
          <div>
            <a className={'font-extrabold text-2xl'} href="/">
              Pooya Golchian
            </a>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-white"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path
                stroke="currentColor"
                d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"
              />
            </svg>
          </div>
        </div>

        <nav className={clsx('relative hidden justify-between lg:flex')}>
          <div>
            <a className={'font-extrabold text-2xl'} href="/">
              Pooya Golchian
            </a>
          </div>
          <ul className="flex flex-row justify-end align-middle">
            {menuItems.map((menuItem, index) => (
              <li
                key={index}
                className="w-full h-full flex align-middle items-center justify-center font-medium"
              >
                <a
                  href={menuItem.link}
                  className="flex px-2 text-gray-800 hover:text-blue-300"
                >
                  {menuItem.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav
          className={clsx(
            'fixed top-0 left-0 w-screen h-screen bg-black z-50 bg-opacity-50 flex justify-center items-center',
            { hidden: !isOpen }
          )}
        >
          <ul className="bg-black w-full h-full flex flex-col">
            <li
              className={'w-full flex justify-end px-4 pt-4'}
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 w-6 text-white"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </li>
            {menuItems.map((menuItem, index) => (
              <li key={index} className="mb-3 lg:mb-0 w-full">
                <a
                  href={menuItem.link}
                  className="flex px-5 py-2 text-gray-800 hover:text-blue-300"
                >
                  {menuItem.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Menu
