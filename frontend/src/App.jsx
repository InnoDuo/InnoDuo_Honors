import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import PageNotFound from './components/PageNotFound';

function App() {

  return (
    <Router>
      <Navbar />

      {/* Adding Routes here  */}
      <Routes>
        <Route path='/' element={<HomePage /> } />
        <Route path='/signin' element={<SignIn /> } />
        <Route path='/signup' element={<SignUp /> } />
        <Route path='*' element={<PageNotFound /> } />
      </ Routes>
      {/* <HomePage /> */}

      <Footer />
    </Router>
  )
}

export default App
