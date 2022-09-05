import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NewPost from './components/NewPost';
import Post from './components/Post';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="posts/:postId" element={<Post />} />
        <Route path="posts/new" element={<NewPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
