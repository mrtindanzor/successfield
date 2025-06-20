import { createSlice } from '@reduxjs/toolkit'

const getServerUri = () => {
  const _l = window.location.href.toLowerCase()
  if(_l.includes('localhost')) return 'http://localhost:8000/successfield'
  return 'https://api.successfieldcollege.com/successfield'
}

const initialState = {
  serverUri: getServerUri(),
  loaderState: true,
  alertMessage: '',
}

const SettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.loaderState = action.payload
    },
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload
    }
  }
})


export const serverUriSelector = state => state.settings.serverUri
export const loaderStateSelector = state => state.settings.loaderState
export const alertMessageSelector = state => state.settings.alertMessage
export const { setLoader, setAlertMessage } = SettingsSlice.actions
export default SettingsSlice.reducer