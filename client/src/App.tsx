import './App.css';
import { FC, useEffect, useContext, useState } from 'react'
import RegistrationForm from './components/RegistrationForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { LoginForm, Profile, Layout, Posts, Faq } from './components';

const App: FC = () => {

  const { store } = useContext(Context)

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return (
      <RegistrationForm />
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Faq />}></Route>
            <Route path='posts' element={<Posts />}></Route>
            <Route path='analytics' element={<LoginForm />}></Route>
            <Route path='releases' element={<LoginForm />}></Route>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='faq' element={<Faq />}></Route>
            <Route path='settings' element={<LoginForm />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default observer(App)

