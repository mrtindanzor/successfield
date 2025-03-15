import { useEffect, useMemo, useRef, useState } from "react";

export default function useAuthentication(credentials){
  const stringPattern = /^[\w\s.,-]+$/
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [initialRefreshPending, setInitialRefreshPending] = useState(true)
  const refreshIntervalRef = useRef()
  const baseUri = 'http://localhost:8000/'

  const headers = useMemo(() => {
    const h = new Headers()
    h.append('Content-Type', 'application/json')
    return h
  },[])

  useEffect(() => {
    
    if(!isLoggedIn && refreshIntervalRef.current) clearInterval(refreshIntervalRef.current)

    updateInitialPending()

    return () => {
      if(refreshIntervalRef.current) clearInterval(refreshIntervalRef.current)
    }
  },[])

  useEffect(() => {
    if(isLoggedIn){
      startRefresh()
    }
  },[isLoggedIn])

  async function updateInitialPending(){
    await startRefresh()
    setInitialRefreshPending(false)
  }

  async function startRefresh(){
    const userLoggedIn = await refreshToken()
    if(!userLoggedIn) return
    const interval = 14 * 60 * 1000
    refreshIntervalRef.current = setInterval(refreshToken, interval)
  }

  async function registration(){
    let { firstname, middlename, surname, email, password, cpassword } = credentials
    if(!firstname) return { msg: 'Enter your firstname' }
    if(firstname.length < 3) return { msg: 'Firstname too short' }
    if(!stringPattern.test(firstname)) return { msg: 'Firstname contains invalid characters' }
    if(middlename && middlename.length < 2) return { msg: 'Middlename too short' }
    if(middlename && !stringPattern.test(middlename)) return { msg: 'middlename contains invalid characters' }
    if(!surname) return { msg: 'Enter your surname' }
    if(surname.length < 3) return { msg: 'Surname too short' }
    if(!stringPattern.test(surname)) return { msg: 'Surname contains invalid characters' }
    if(!email) return { msg: 'Enter your email address' }
    if(!emailPattern.test(email)) return { msg: 'Email address contains invalid characters' }
    if(!password) return { msg: 'Enter a password' }
    if(password.length < 8) return { msg: 'Password must not be less than 8 characters' }
    if(password !== cpassword) return { msg: 'Passwords do not match' }


    const uri = baseUri + 'users/register'
    const body = JSON.stringify({ firstname, middlename, surname, email, password, cpassword })
    const options = { method: 'PUT', headers, body }

    try{
      const response = await fetch(uri, options)
      if(!response.ok) return { msg: 'An error occured'} 
      const res = await response.json()
      return { msg: res.msg}
    } 
      catch(err){
        return { msg: err.message}
    }

  }
  
  async function login(){
    const email = credentials.email?.toLowerCase()
    const password = credentials.password

    if(!email) return { msg: 'Enter an email address'}
    if(!password) return { msg: 'Enter your password'}
    if(!emailPattern.test(email)) return { msg: 'Enter a valid email address'}

    const uri = baseUri + 'users/login'
    const body = JSON.stringify({email, password})
    const options = { method: 'POST', headers, body, credentials: 'include' }

    try{
      const response = await fetch(uri, options)
      if(!response.ok) return { msg: 'An error occured'}
      const res = await response.json()
      switch(res.status){
        case 200: 
          setToken(res.token)
          setCurrentUser(res.user)
          setIsLoggedIn(true)
            break;
        
        default: 
          return { msg: res.msg}
      }
    }
      catch(err){
        return { msg: err.message}
      }
  }

  async function refreshToken(){
    const uri = baseUri + 'users/newToken'
    const method = 'POST'
    try{
      const response = await fetch(uri, { method, headers, credentials: 'include' })
      if(!response.ok) return
      const res = await response.json()
      if(res.token){
        setToken(res.token)
        setCurrentUser(res.user)
        setIsLoggedIn(true)
        return true
      } else{
        setToken(null)
        setCurrentUser(null)
        setIsLoggedIn(false)
        return false
      }
    }
      catch(err){
        return
      }
  }

  return { isLoggedIn, initialRefreshPending, registration, login, currentUser }
}