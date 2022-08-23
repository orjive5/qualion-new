import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import './App.css'

function App() {
  const [foundData, setFoundData] = useState([]);
  const [activeTag, setActiveTag] = useState('');

  return (
    <div className="app">
      <Header setFoundData={setFoundData} activeTag={activeTag} setActiveTag={setActiveTag} />
      <Main foundData={foundData} activeTag={activeTag} setActiveTag={setActiveTag} />
      <Footer />
    </div>
  )
}

export default App;
