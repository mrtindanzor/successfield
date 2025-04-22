import { useEffect, useMemo, useRef, useState } from "react";
import { useSetAlert } from "../Alerter/Alerter";
import useServerUri from "../../Contexts/serverContexts/baseServer";
import { jwtDecode } from 'jwt-decode'
import { capitalize } from "../../core";

export default function useAuthentication(){
  const setAlert = useSetAlert()
  const stringPattern = /^[\w\s.,-]+$/
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ token, setToken ] = useState(null)
  const [ currentUser, setCurrentUser ] = useState(null)
  const [ certificates, setCertificates ] = useState(null)
  const [ userPhoto, setUserPhoto ] = useState(null)
  const [ userFullName, setUserFullName ] = useState(null)
  const [ initialFetch, setInitialFetch ] = useState(true)
  const fetchesRef = useRef(0)
  const autoFetchTokenRef = useRef()
  const serverUri = useServerUri()

  const headers = useMemo(() => {
    const h = new Headers()
    h.append('Content-Type', 'application/json')
    if(token) h.append('Authorization', `Bearer ${token}`)
    return h
  },[token])

  const autoFetchToken = () => {
    autoFetchTokenRef.current = setInterval(refreshToken, 14 * 60 * 1000)
    fetchesRef.current = 1
  }
  
  useEffect(() => {
    isLoggedIn && (fetch(serverUri + 'users/user', { headers, method: 'POST', body: JSON.stringify({ email: currentUser.email }) }) 
    .then( response => response.json() )
    .then(data => setUserPhoto(data.pic))
    .catch(err => null))
  }, [isLoggedIn])

  useEffect(() => {
    currentUser && setUserFullName(capitalize(currentUser.firstname + (currentUser.middlename && ' ' + currentUser.middlename ) + ' ' + currentUser.surname) )

    if(currentUser && !certificates) getCertificates()
      console.log(currentUser)
  }, [currentUser])

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

  async function registration(credentials){
    let {
      programme,
      firstname,
      middlename,
      surname,
      birthDate,
      gender,
      address,
      nationalId,
      userImage,
      phoneNumber,
      email,
      educationLevel,
      contact,
      password,
      cpassword
    } = credentials

    if(contact !== '') return { msg: 'Unable to complete registration at this time', status: 403 }
    if(!programme) return { msg: 'Select a programme', status: 403 }
    if(!educationLevel) return { msg: 'Select your highest level of education', status: 403 }
    if(!firstname) return { msg: 'Enter your first name', status: 403 }
    if(firstname.length < 3) return { msg: 'First name too short', status: 403 }
    if(!stringPattern.test(firstname)) return { msg: 'First name contains invalid characters', status: 403 }
    if(middlename && middlename.length < 2) return { msg: 'Middle name too short', status: 403 }
    if(middlename && !stringPattern.test(middlename)) return { msg: 'middle name contains invalid characters', status: 403 }
    if(!surname) return { msg: 'Enter your surname', status: 403 }
    if(surname.length < 3) return { msg: 'Surname too short', status: 403 }
    if(!stringPattern.test(surname)) return { msg: 'Surname contains invalid characters', status: 403 }
    if(!gender) return { msg: 'Select your gender', status: 403 }
    if(!address) return { msg: 'Fill your address', status: 403 }
    if(!nationalId) return { msg: 'Select an identification document', status: 403 }
    if(!userImage) return { msg: 'Add a passport photo', status: 403 }
    if(!phoneNumber) return { msg: 'Enter a valid phone number', status: 403 }
    if(!email) return { msg: 'Enter your email address', status: 403 }
    if(!emailPattern.test(email)) return { msg: 'Email address contains invalid characters', status: 403 }
    if(!password) return { msg: 'Enter a password', status: 403 }
    if(password.length < 8) return { msg: 'Password must not be less than 8 characters', status: 403 }
    if(password !== cpassword) return { msg: 'Passwords do not match', status: 403 }


    const uri = serverUri + 'users/register'
    const body = new FormData()
    for(const key in credentials){
      if( key === 'address' ){
        body.append(key, JSON.stringify(credentials[key]))
        continue
      }
      body.append(key, credentials[key])
    }
    const options = {
      method: 'PUT',
      body
    }

    try{
      const response = await fetch(uri, options)
      if(!response.ok) return { msg: 'An error occured'} 
      const res = await response.json()
      return res
    } 
      catch(err){
        return { msg: err.message, status: 403 }
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
          navigate('/', { replace: true })
        break
        
        default: 
          setAlert(res.msg)
        break
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

  async function getCertificates(){
    const uri = serverUri + 'certificate'
    const method = 'PATCH'
    const body = JSON.stringify({ studentNumber: currentUser.studentNumber, operation: 'findCertificate' })
    
    const options = {
      method, 
      headers,
      body
    }

    try {
      const response = await fetch(uri, options)
      if(!response) setCertificates(null)
      const res = await response.json()
      if(res.findCertificates.length > 0) return setCertificates(res.findCertificates)
      setCertificates(null)
    } catch (err) {
      setCertificates(null)
    }
  }

  async function checkIfStudentIsAuthorizedForCourse(code){
    try {
      let courseCode = code.toLowerCase().trim()
      const uri = serverUri + 'users/module'
      const body = JSON.stringify({ courseCode })
      const response = await fetch(uri, { headers, method: 'POST', body })
      if(!response) throw Error('Error authorizing you, try again in a moment')
      const res = await response.json()
      return res
    } catch (err) {
      return ({ msg: err.message, status: 401 })
    }
  }

  return { 
    isLoggedIn, 
    checkIfStudentIsAuthorizedForCourse,
    initialFetch, 
    registration, 
    login, 
    logout, 
    setToken,
    certificates,
    currentUser, 
    setCurrentUser, 
    userFullName,
    token, 
    userPhoto }
}

