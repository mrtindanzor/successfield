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
import usePersister from './utils/Persister.jsx'

const [ persistState, getPersistedState ] = usePersister()

const store = configureStore({
  reducer:{
    auth: userSlice,
    settings: settingsSlice,
    courses: coursesSlice,
    accreditations: accreditationsSlice,
    faqs: faqsSlice,
    admin: adminSlice
  },
  preloadedState: getPersistedState('sfc') ?? undefined
})

store.subscribe(() => {
  const state = store.getState()
  persistState('sfc', state)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </StrictMode>,
)