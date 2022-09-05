import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Main.css';

const Main = ({ foundData }) => {
  const [allData, setAllData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getAllData = () => {
    axios
      .get('https://qualion-blog.herokuapp.com/posts')
      .then((res) => {
        setAllData(res.data.reverse());
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const postListings = allData.map((singleData) => {
    const timestamp = new Date(singleData.createdAt).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
    return (
      <div className="post-listing" key={singleData._id}>
        <article className="post-article">
          <Link to={`/posts/${singleData._id}`} className="image-link">
            <img src={singleData.imageUrl} alt="" />
          </Link>
          <div className="article-details">
            <Link to={`/posts/${singleData._id}`} style={{ textDecoration: 'none' }}>
              <h1 className="article-title">{singleData.title}</h1>
            </Link>
            <h1 className={singleData.isPublished ? 'article-published' : 'article-not-published'}>
              {singleData.isPublished ? 'Post published' : 'Not published'}
            </h1>
            <p>{timestamp}</p>
            <p>#{singleData.tags.join(' #')}</p>
          </div>
        </article>
        <hr></hr>
      </div>
    );
  });

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (foundData.length !== 0) {
      setAllData(foundData);
    }
  }, [foundData]);

  return (
    <main>
      <section className="display-posts">
        {isLoading ? (
          <div className="component-loading">
            <h1>Loading...</h1>
          </div>
        ) : (
          postListings
        )}
      </section>
    </main>
  );
};

export default Main;
