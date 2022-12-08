import React from 'react'
import { createRoot } from 'react-dom/client'

import '../assets/css/main.css'
import MainEditor from './components/MainEditor'

import './googleAnalytics'

const container = document.getElementById('react-app')
const root = createRoot(container!)
root.render(<MainEditor />)
