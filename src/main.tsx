import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// index.css is empty
import './index.css'
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider>
      <ModalsProvider>
        <App />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>,
)
