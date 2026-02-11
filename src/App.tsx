import './App.css'
import Header from './components/views/Header'
import SearchBar from './components/views/SearchBar'
import Hero from './components/views/Hero'

import { useRef, useState } from 'react'
function App() {
   const searchInputRef = useRef<HTMLInputElement|null>(null);
   const [heroLoading,setHeroLoading]=useState(false);

  return (
    <>
     <section className=''>
       <Header heroLoading={heroLoading}
       setHeroLoading={setHeroLoading}></Header>
     </section>

     <section> 
       <SearchBar searchInputRef={searchInputRef}/>
     </section> 

     <section>
      <Hero searchInputRef={searchInputRef} heroLoading={heroLoading}
       setHeroLoading={setHeroLoading}></Hero>
     </section>
    </>
  )
}

export default App
