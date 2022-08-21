import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Post from "./components/Post";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/posts/:postId" element={<Post />} />
        <Route path="/posts/:latestId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;