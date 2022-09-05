import React from 'react';
import HeaderSimple from './HeaderSimple';
import Footer from './Footer';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page legal-page">
      <HeaderSimple />
      <div className="page-container">
        <h1>PRIVACY POLICY</h1>
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

export default PrivacyPolicy;
