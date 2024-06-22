import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import Students from './components/Students';
import PageNotFound from './components/PageNotFound';
import StudentProfile from './components/StudentProfile';
import { ThemeProvider } from './context/theme';
import {React, useState, useEffect} from 'react';


function App() {
  const [defaultTheme, setDefaultTheme] = useState('light')
  
  const darkTheme = ()=>{
    setDefaultTheme('dark')
  }
  const lightTheme = ()=>{
    setDefaultTheme('light')
  }

  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light')
    document.querySelector('html').classList.add(defaultTheme)
  }, [defaultTheme])
    

  return (
    <ThemeProvider value={{defaultTheme, darkTheme, lightTheme}}>

    <Router>
      <Navbar />

      {/* Adding Routes here  */}
      <Routes>
        <Route path='/' element={<HomePage/> } />
        <Route path='/signin' element={<SignIn /> } />
        <Route path='/signup' element={<SignUp /> } />
        <Route path='/students' element={<Students /> } />
        <Route path='/profile' element={<StudentProfile />} />
        <Route path='*' element={<PageNotFound /> } />
      </ Routes>
      {/* <HomePage /> */}

      <Footer />
    </Router>
    </ThemeProvider>
  )
}

export const homeThemeStyle = {
  backgroundColor: '#272727',
  color: '#f1f1f1',
}

export const inpWrapThemeStyle = {
  border: 'solid 1px #fff',
}

export const inpFieldThemeStyle = {
  color: '#f1f1f1',
}



export default App
