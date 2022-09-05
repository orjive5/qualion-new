import React, { useState } from 'react';
import HeaderMain from './components/HeaderMain';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [foundData, setFoundData] = useState([]);
  const [activeTag, setActiveTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="app">
      <HeaderMain
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setFoundData={setFoundData}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />
      <Main
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        foundData={foundData}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />
      <Footer />
    </div>
  );
}

export default App;
