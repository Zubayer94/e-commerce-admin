import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'
import { login } from '../Store/Slices/authSlice';
import Validation from '../utils/Validation';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')
  const dispatch = useDispatch()
  let authError = useSelector(state => state.entities.auth.authError)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password}))
      .unwrap()
      .then(() => {
        history.push('/');
      })
      .catch((rejectedValueOrSerializedError) => {
        setFormError(rejectedValueOrSerializedError)
      })
  }

  const getError = (key) => {
    return (formError[key] !== undefined) ? formError[key][0] : null;
  }

  const clearError = (key) => {
    if (key) {
      delete formError[key];
      return;
    }
    setFormError('');
  }
  
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              {!!authError ? <span className="align-middle text-red-600">{authError}</span> : null}
              <form onSubmit={handleSubmit} > 
                <Label>
                  <span>Email</span>
                  <Input className="mt-1" onChange={(e) => {setEmail(e.target.value); clearError('email')}} value={email} type="email" placeholder="john@doe.com" />
                </Label>
                <Validation errorText={getError('email')} />

                <Label className="mt-4">
                  <span>Password</span>
                  <Input className="mt-1" onChange={(e) => {setPassword(e.target.value); clearError('password')}} value={password} type="password" placeholder="***************" />
                </Label>
                <Validation errorText={getError('password')} />

                <Button className="mt-4" block type="submit" >
                  Log in
                </Button>
              </form>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
