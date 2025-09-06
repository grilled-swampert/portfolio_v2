import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu  = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <button
     onClick={toggleMenu} 
     className={
      ` fixed top-6 right-6 z-50 p-3 rounded-full transition-colors duration-300
        ${
          isOpen ? 'bg-white text-black' 
          : 'bg-black text-white hover:bg-gray-800'
        } shadow-2xl
      `
     }
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  )
}

export default Navbar