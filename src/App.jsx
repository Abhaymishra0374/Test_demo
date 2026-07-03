import Navbar from "./components/Navbar"
import './App.css'
import Hero from "./components/Hero"
import About from "./components/About"
import Project from "./components/Project"
function App() {

  return (
    <>
      <Navbar />
      <Hero></Hero> 
      <About /> 
      <Project />
    </>
  )
}

export default App
