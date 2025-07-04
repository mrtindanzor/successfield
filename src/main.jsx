import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userSlice from './Slices/userSlice.jsx'
import settingsSlice from './Slices/settingsSlice.jsx'
import coursesSlice from './Slices/coursesSlice.jsx'
import faqsSlice from './Slices/FaqsSlice.jsx'
import accreditationsSlice from './Slices/accreditationsSlice.jsx'
import adminSlice from './Slices/adminSlice.jsx'

const store = configureStore({
  reducer:{
    auth: userSlice,
    settings: settingsSlice,
    courses: coursesSlice,
    accreditations: accreditationsSlice,
    faqs: faqsSlice,
    admin: adminSlice
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </StrictMode>,
)