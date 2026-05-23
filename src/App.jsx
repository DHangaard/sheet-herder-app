import { Outlet } from 'react-router'
import { useState, useEffect } from 'react'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'


export default function App() {

  const [isDark, setIsDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  useEffect (() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(previousValue => !previousValue);
  }
  
  return (
    <>
    <Header isDark={isDark} toggleTheme={toggleTheme} />
    <main>
      <Outlet />
    </main>
    <Footer />
    </>
  )
}