import React from "react";

const Footer = () => {
  const scrollToTop = () => {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });
  }
  return (
    <footer>
      <button onClick={scrollToTop}>Scroll to the top</button>
    </footer>
  )
}

export default Footer;