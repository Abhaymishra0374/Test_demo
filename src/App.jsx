import { AuthProvider } from './context/AuthContext'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import About        from './components/About'
import Skills       from './components/Skills'
import Projects     from './components/Project'
import Certificates from './components/Certificate'
import Contact      from './components/Contact'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
    </AuthProvider>
  )
}

export default App
