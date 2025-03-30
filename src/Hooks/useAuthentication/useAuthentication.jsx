import { useEffect, useMemo, useRef, useState } from "react";
import { useSetAlert } from "../Alerter/Alerter";
import useServerUri from "../../Contexts/serverContexts/baseServer";
import { jwtDecode } from 'jwt-decode'

export default function useAuthentication(){
  const setAlert = useSetAlert()
  const stringPattern = /^[\w\s.,-]+$/
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [initialFetch, setInitialFetch] = useState(true)
  const fetchesRef = useRef(0)
  const autoFetchTokenRef = useRef()
  const serverUri = useServerUri()

  const headers = useMemo(() => {
    const h = new Headers()
    h.append('Content-Type', 'application/json')
    return h
  },[])

  const autoFetchToken = () => {
    autoFetchTokenRef.current = setInterval(refreshToken, 14 * 60 * 1000)
    fetchesRef.current = 1
  }
  
  useEffect(() => {
    !isLoggedIn && fetchesRef.current < 1 && refreshToken()
      .then( res => {
        clearInterval(autoFetchToken)
        setInitialFetch(false)
      })

    if(isLoggedIn) autoFetchToken()
    if(fetchesRef.current > 0 && !isLoggedIn) autoFetchTokenRef.current && clearInterval(autoFetchTokenRef.current)

    return () => {
      if(!isLoggedIn && autoFetchTokenRef.current) {
        clearInterval(autoFetchTokenRef.current)
      }
    }
  },[isLoggedIn])



  async function registration(credentials, navigate){
    let { firstname, middlename, surname, email, contact, password, cpassword } = credentials
    if(contact !== '') return { msg: 'Unable to complete registration at this time' }
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


    const uri = serverUri + 'users/register'
    const body = JSON.stringify({ firstname, middlename, surname, email, password, cpassword })
    const options = { method: 'PUT', headers, body }

    try{
      const response = await fetch(uri, options)
      if(!response.ok) return { msg: 'An error occured'} 
      const res = await response.json()
      setAlert(res.msg)
      if(res.status === 201) setTimeout(() => navigate('/users/students-area'), 5000)
    } 
      catch(err){
        setAlert(err.msg)
    }

  }
  
  async function login(credentials, navigate){
    const email = credentials.email?.toLowerCase()
    const password = credentials.password

    if(!email) return { msg: 'Enter an email address'}
    if(!password) return { msg: 'Enter your password'}
    if(!emailPattern.test(email)) return { msg: 'Enter a valid email address'}

    const uri = serverUri + 'users/login'
    const body = JSON.stringify({email, password})
    const options = { method: 'POST', headers, body, credentials: 'include' }

    try{
      const response = await fetch(uri, options)
      if(!response.ok) return setAlert('An error occured')
      const res = await response.json()
      switch(res.status){
        case 200: 
          setToken(res.token)
          const decodedUser = jwtDecode(res.token)
          setCurrentUser(decodedUser)
          setIsLoggedIn(true)
          setAlert(res.msg)
          setTimeout(() => navigate('/'), 4000)
            break
        
        default: 
          return setAlert(res.msg)
      }
    }
      catch(err){
        return setAlert(err.message)
      }
  }

  async function refreshToken(){
    const uri = serverUri + 'users/newToken'
    const method = 'POST'
    try{
      const response = await fetch(uri, { method, headers, credentials: 'include' })
      if(!response.ok) return
      const res = await response.json()
      if(res.token){
        setToken(res.token)
        const decodedUser = jwtDecode(res.token)
        delete decodedUser.iat
        delete decodedUser.exp
        setCurrentUser(decodedUser)
        setIsLoggedIn(true)
        return { loggedIn : true }
      } else{
        setToken(null)
        setCurrentUser(null)
        setIsLoggedIn(false)
        return { loggedIn : false }
      }
    }
      catch(err){
        return false
      }
  }

  async function logout(){
    const uri = serverUri + 'logout'
    const method = 'POST'
    
  }

  return { isLoggedIn, initialFetch, registration, login, logout, currentUser }
}

