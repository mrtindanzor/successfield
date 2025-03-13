import { useEffect, useMemo, useState } from "react";

export default function useAuthentication(credentials = ''){
  const stringPattern = /^[\w\s.,-]+$/
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState()
  const baseUri = 'http://localhost:8000/'
  const headers = useMemo(() => {
    const h = new Headers()
    h.append('Content-Type', 'application/json')
    if(token) h.append('Authorization', 'Bearer ' + token)
    return h
  }, [])

  async function registration(){
    const firstname = credentials?.firstname?.toLowerCase()
    const middlename = credentials?.middlename?.toLowerCase()
    const surname = credentials?.surname?.toLowerCase()
    const email = credentials?.email?.toLowerCase()
    const password = credentials?.password?.toLowerCase()
    const cpassword = credentials?.cpassword?.toLowerCase()
    if(!firstname) return {msg: 'Enter your firstname'}
    if(!surname) return {msg: 'Enter your surname'}
    if(!email) return {msg: 'Enter your email address'}
    if(!password) return {msg: 'Enter a password'}
    if(password !== cpassword) return {msg: 'Passwords do not match'}
    if(!stringPattern.test(firstname)) return {msg: 'Firstname contains invalid characters'}
    if(!stringPattern.test(surname)) return {msg: 'Surname contains invalid characters'}
    if(middlename && !stringPattern.test(middlename)) return {msg: 'middlename contains invalid characters'}
    if(!emailPattern.test(email)) return {msg: 'Email address contains invalid characters'}


    const uri = baseUri + 'users/register'
    const body = JSON.stringify({ firstname, middlename, surname, email, password, cpassword })
    const options = { method: 'POST', headers, body }
    const response = await fetch(uri, options)
    if(!response.ok) return {msg: 'An error occured'} 
    const res = await response.json()
    return {msg: res.msg}
  }
  
  async function login(){
    const email = credentials?.email?.toLowerCase()
    const password = credentials?.password

    if(!email) return {msg: 'Enter an email address'}
    if(!password) return {msg: 'Enter your password'}
    if(!emailPattern.test(email)) return {msg: 'Enter a valid email address'}

    const uri = baseUri + 'users/login'
    const body = JSON.stringify({email, password})
    const options = { method: 'POST', headers, body }
    const response = await fetch(uri, options)
    if(!response.ok) return {msg: 'An error occured'}
    switch(res.status){
      case 200: 
        setToken(res.token)
        setIsLoggedIn(true)
      
      default: 
        return {msg: res.msg}
    }
  }

  return { isLoggedIn, registration, login }
}