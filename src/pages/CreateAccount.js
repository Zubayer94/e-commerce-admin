import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { Input, Label, Button } from '@windmill/react-ui'
import { register } from '../Store/Slices/authSlice';
import Validation from '../utils/Validation';

function Login() {

  const dispatch = useDispatch()
  const history = useHistory();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [is_admin, setIsAdmin] = useState(1)
  const [password, setPassword] = useState('')
  const [password_confirmation, setPassword_confirmation] = useState('')
  const [formError, setFormError] = useState('')

  let authError = useSelector(state => state.entities.auth.authError)

  const handlRegister = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password, password_confirmation, is_admin }))
      .unwrap()
      .then(() => {
        history.push('/login');
      })
      .catch(rejectedValueOrSerializedError => setFormError(rejectedValueOrSerializedError))
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              {!!authError ? <span className="align-middle text-red-600">{authError}</span> : null}
              <form onSubmit={handlRegister} >
                <Label>
                  <span>Name</span>
                  <Input className="mt-1" onChange={(e) => {setName(e.target.value)}} value={name} type="text" placeholder="John Doe" />
                </Label>
                <Validation errorText={getError('name')} />

                <Label>
                  <span>Email</span>
                  <Input className="mt-1" onChange={(e) => {setEmail(e.target.value)}} value={email} type="email" placeholder="john@doe.com" />
                </Label>
                <Validation errorText={getError('email')} />

                <Label className="mt-4">
                  <span>Password</span>
                  <Input className="mt-1" onChange={(e) => {setPassword(e.target.value)}} value={password} placeholder="***************" type="password" />
                </Label>
                <Validation errorText={getError('password')} />

                <Label className="mt-4">
                  <span>Confirm password</span>
                  <Input className="mt-1" onChange={(e) => { setPassword_confirmation(e.target.value)}} value={password_confirmation} placeholder="***************" type="password" />
                </Label>
                <Validation errorText={getError('password')} />

                <Button block className="mt-4" type='submit' >
                  Create account
                </Button>
              </form>
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
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
