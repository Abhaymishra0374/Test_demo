import Navbar from "./components/Navbar"
import './App.css'
import Hero from "./components/Hero"
import About from "./components/About"
import Project from "./components/Project"
import Skills from "./components/Skills"
import Certificates from "./components/Certificate"
import Contact from './components/Contact';
function App() {

  return (
    <>
      <Navbar />
      <Hero></Hero> 
      <About /> 
      <Skills />
      <Project />
      <Certificates/>
      <Contact />
    </>
  )
}

export default App
