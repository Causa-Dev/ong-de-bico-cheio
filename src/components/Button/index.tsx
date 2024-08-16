import React from 'react'
import './styles.css'

interface ButtonProps {
  children: React.ReactNode
  buttonClass?: string
}

export const Button: React.FC<ButtonProps> = ({ children, buttonClass = 'button-hollow' }) => {
  return (
    <button className={buttonClass}>
      {children}
    </button>
  )
}
