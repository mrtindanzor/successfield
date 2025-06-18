import { useEffect, useMemo, useRef, useState } from "react";
import useServerUri from "../Contexts/baseServer";
import { jwtDecode } from 'jwt-decode'
import { capitalize } from "../core";
import axios from "axios";

export default function useAuthentication(){
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

  const autoFetchToken = () => {
    autoFetchTokenRef.current = setInterval(refreshToken, 14 * 60 * 1000)
    fetchesRef.current = 1
  }

  useEffect(() => {
    currentUser && setUserFullName(capitalize(currentUser.firstname + (currentUser.middlename && ' ' + currentUser.middlename || '' ) + ' ' + currentUser.surname) )
    
    setUserPhoto(currentUser?.userImage?.secure_url || '')

    if(currentUser && !certificates) getCertificates()
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

    if(contact !== '') return { msg: 'Unable to complete registration at this time', status: 403, currentForm: 1 }
    if(!firstname) return { msg: 'Enter your first name', status: 403, currentForm: 1 }
    if(firstname.length < 3) return { msg: 'First name too short', status: 403, currentForm: 1 }
    if(!stringPattern.test(firstname)) return { msg: 'First name contains invalid characters', status: 403, currentForm: 1 }
    if(middlename && middlename.length < 2) return { msg: 'Middle name too short', status: 403, currentForm: 1 }
    if(middlename && !stringPattern.test(middlename)) return { msg: 'middle name contains invalid characters', status: 403, currentForm: 1 }
    if(!surname) return { msg: 'Enter your surname', status: 403, currentForm: 1 }
    if(surname.length < 3) return { msg: 'Surname too short', status: 403, currentForm: 1 }
    if(!stringPattern.test(surname)) return { msg: 'Surname contains invalid characters', status: 403, currentForm: 1 }
    if(!gender) return { msg: 'Select your gender', status: 403, currentForm: 1 }
    if(!programme) return { msg: 'Select a programme', status: 403, currentForm: 2 }
    if(!educationLevel) return { msg: 'Select your highest level of education', status: 403, currentForm: 2 }
    if(!nationalId) return { msg: 'Select an identification document', status: 403, currentForm: 2 }
    if(!userImage) return { msg: 'Add a passport photo', status: 403, currentForm: 2  }
    if(!address.country) return { msg: 'Add your country', status: 403, currentForm: 3 }
    if(!address.state) return { msg: 'Add your region', status: 403, currentForm: 3 }
    if(!address.city) return { msg: 'Add your city', status: 403, currentForm: 3 }
    if(!address.address1) return { msg: 'Add your street address', status: 403, currentForm: 3 }
    if(!phoneNumber) return { msg: 'Enter a valid phone number', status: 403, currentForm: 3 }
    if(!email) return { msg: 'Enter your email address', status: 403, currentForm: 4 }
    if(!emailPattern.test(email)) return { msg: 'Email address contains invalid characters', status: 403, currentForm: 4 }
    if(!password) return { msg: 'Enter a password', status: 403, currentForm: 4 }
    if(password.length < 8) return { msg: 'Password must not be less than 8 characters', status: 403, currentForm: 4 }
    if(password !== cpassword) return { msg: 'Passwords do not match', status: 403, currentForm: 4 }


    const uri = serverUri + 'users/register'
    const formdata = new FormData()
    for(const key in credentials){
      if( key === 'address' ){
        formdata.append(key, JSON.stringify(credentials[key]))
        continue
      }
      formdata.append(key, credentials[key])
    }

    try{
      const res = await axios.put(uri, formdata,{ 
        headers: { 'Content-Type': 'multipary/form-data' }
       })
      switch(res.data.msg){
        case 201:
          res.data
        break

        default:
          throw Error(res.data.msg || 'Something went wrong')
      }
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

    try{
      const uri = serverUri + 'users/login'
      const res = await axios.post(uri, { email, password }, { withCredentials: true })
      switch(res.data.status){
        case 200: 
          setToken(res.data.token)
          const decodedUser = jwtDecode(res.data.token)
          setCurrentUser(decodedUser)
          setIsLoggedIn(true)
          navigate('/', { replace: true })
          return res.data
        
        default: 
          return res.data
      }
    }
      catch(err){
        return ({ status: 500, message: err.message})
      }
  }

  async function refreshToken(){
    const method = 'POST'
    try{
      const uri = serverUri + 'users/newToken'
      const res = await axios.post(uri, {},{ withCredentials: true })
      if(res.data.token){
        setToken(res.data.token)
        const decodedUser = jwtDecode(res.data.token)
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
    try{
      const uri = serverUri + 'users/logout'
      const res = await axios.post(uri, {}, { withCredentials: true })
      if(res.data.status === 200) return window.location.href = '/'
      return { success: res.data.status === 200, error: res.data.status !== 200, msg: res.data?.msg || 'Something went wrong' }
    } catch(err){
      return { error: true, msg: err.message }
    }
  }

  async function getCertificates(){
    try {
      const uri = serverUri + 'certificate'
      const res = await axios.patch(uri, { studentNumber: currentUser.studentNumber, operation: 'findCertificate' })
      if(res.data?.findCertificates.length > 0) return setCertificates(res.data.findCertificates)
      setCertificates(null)
    } catch (err) {
      setCertificates(null)
    }
  }

  async function checkIfStudentIsAuthorizedForCourse(code){
    try {
      let courseCode = code.toLowerCase().trim()
      const uri = serverUri + 'users/module'
      const res = await axios.post(uri, { courseCode }, { withCredentials: true })
      return res.data
    } catch (err) {
      return ({ msg: err.message, status: 401 })
    }
  }

  return { 
    userPhoto,
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
    token }
}

