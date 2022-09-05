import React from 'react';
import HeaderSimple from './HeaderSimple';
import Footer from './Footer';

const Faq = () => {
  return (
    <div className="faq-page legal-page">
      <HeaderSimple />
      <div className="page-container">
        <h1>FAQ</h1>
        <div className="page-text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, libero ipsum quasi ab
            voluptates quaerat sunt quas illo esse non provident cum numquam mollitia modi fugit
            possimus natus hic rem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, libero ipsum quasi ab
            voluptates quaerat sunt quas illo esse non provident cum numquam mollitia modi fugit
            possimus natus hic rem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
            libero ipsum quasi ab voluptates quaerat sunt quas illo esse non provident cum numquam
            mollitia modi fugit possimus natus hic rem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, libero ipsum quasi ab
            voluptates quaerat sunt quas illo esse non provident cum numquam mollitia modi fugit
            possimus natus hic rem.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Faq;
