import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/colors.css'
import './styles/reset.css'
import './styles/typography.css'
import './styles/globals.css'
import { Header } from './components/Header'
import { SessionBegin } from './components/SessionBegin'
import { SessionAboutUs } from './components/SessionAboutUs'

const rootElement = document.getElementById('root')

if (rootElement !== null) {
  createRoot(rootElement).render(<>
    <Header/>
    <SessionBegin />
    <SessionAboutUs />
  </>)
} else {
  console.error('Failed to find the root element')
}
