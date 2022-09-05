import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import About from './components/About';
import Contact from './components/Contact';
import Contribute from './components/Contribute';
import Faq from './components/Faq';
import Post from './components/Post';
import PrivacyPolicy from './components/PrivacyPolicy';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/posts/:postId" element={<Post />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
