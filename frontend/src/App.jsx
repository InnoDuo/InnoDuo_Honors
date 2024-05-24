import './App.css'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />

      {/* Adding Routes here  */}
      <HomePage />

      <Footer />
    </>
  )
}

export default App
