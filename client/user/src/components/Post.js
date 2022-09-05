import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderSimple from './HeaderSimple';
import Footer from './Footer';
import './Post.css';
import PostLoader from './PostLoader';
import parseHtml from 'html-react-parser';

const Post = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [post, setPost] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const loadPosts = () => {
    axios
      .get('https://qualion-blog.herokuapp.com/posts')
      .then(function (response) {
        const post = response.data.find((post) => post._id === postId);
        setPost(post);
        const latest = response.data.slice(-4).filter((el) => el._id !== postId);
        setLatestPosts(() => {
          if (latest.length === 4) {
            return latest.slice(1);
          } else {
            return latest;
          }
        });
      })
      .catch((err) => console.log(err, 'it has an error'))
      .finally(() => setLoading(false));
  };

  const displayLatest = latestPosts.map((latest) => {
    const changePost = () => {
      navigate(`/posts/${latest._id}`);
      navigate(0);
    };

    return (
      <div onClick={changePost} className="latest-post" key={latest._id}>
        <img src={latest.imageUrl} alt="" />
        <h1>{latest.title}</h1>
      </div>
    );
  });

  useEffect(() => {
    loadPosts();
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [isLoading]);

  return (
    <div className="post">
      <HeaderSimple />
      {isLoading ? (
        <PostLoader />
      ) : (
        <div className="post-main">
          <div className="post-header">
            <img src={post.imageUrl} alt="" />
            <div className="post-title">
              <h1>
                <span>{post.title}</span>
              </h1>
            </div>
          </div>
          <div className="post-container">
            <div className="post-body">{parseHtml(post.text)}</div>
            <div className="latest-posts">
              <h1>LATEST POSTS:</h1>
              <div className="display-latest">{displayLatest}</div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Post;
