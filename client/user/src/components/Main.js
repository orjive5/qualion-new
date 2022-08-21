import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import './Main.css'
import MainLoader from "./MainLoader";

const Main = () => {
  const getAllData = () => {
    axios
        .get('http://localhost:8000/posts')
        .then((res) => {
            const publishedPosts = res.data.filter(element => element.isPublished === true)
          setAllData(publishedPosts);
          setActiveData(publishedPosts);
        })
      .catch((err) => console.log(err, 'Arrgh, it\'s an error...'))
      .finally(() => setLoading(false))
  }

  const [allData, setAllData] = useState([]);
  useEffect(() => { getAllData() }, []);

  const [isLoading, setLoading] = useState(true)

  const [allTags, setAllTags] = useState([]);
  const getAllTags = () => {
    const getTags = allData.map(el => el.tags).flat();
    setAllTags([...new Set(getTags)])
  }
  useEffect(() => { getAllTags() }, []);

  const [activeTag, setActiveTag] = useState('');

  const [activeData, setActiveData] = useState([]);
  useEffect(() => setActiveData(allData.filter(el => {
        if (el.tags.includes(activeTag)) {
          return el;
        }
  })), [activeTag]);

  const postListings = activeData.map((singleData) => {
    const timestamp = new Date(singleData.createdAt).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      }
    )

    const postTags = singleData.tags.map(el => {
      return `#${el.trim()}`
    })

    const displayTags = postTags.map(el => {
      return (
        <p onClick={() => setActiveTag(`${el.substring(1)}`)} className="tags-paragraph" key={`${el}${singleData._id}`}>{el}</p>
      )
    });

    return (
      <article key={singleData._id} className='post-listing'>
        <Link to={`/posts/${singleData._id}`}>
        <img
          src={singleData.imageUrl}
          alt=""
          className="post-listing-image"
        />
        </Link>
        <div className="post-listing-details">
          <Link to={`/posts/${singleData._id}`} style={{ textDecoration: 'none' }}>
          <hr></hr>
            <h1 className="post-listing-title">{singleData.title}</h1>
          </Link>
          <p className="subtitle-paragraph">{singleData.subtitle}</p>
          <div className="date-and-tags">
            <p className="time-paragraph">{timestamp}</p>
            <div>
              {displayTags}
            </div>
          </div>
        </div>
      </article>
    )
  }).reverse()

  const DisplayActiveTag = () => {
    return (
      <div className="active-tag">
          <h1><span className="hashtag">#</span>{activeTag}</h1>
          <button
            onClick={() => {
            setActiveTag('');
            getAllData();
            }}>
            Clear
          </button>
      </div>
    )
  }
  
  return (
    <main className="main-content">
      {activeTag !== '' && <DisplayActiveTag />}
      <section className="display-posts">
        {isLoading ? (
          <div className="main-loader">
            <MainLoader />
            <MainLoader />
          </div>
        ) : postListings}
      </section>
      {isLoading ? <div><h1>Loading...</h1></div> : (
        <div className="pagination-container">
          <ul className="pagination">
            <li>
              <div className="pagination-item">
                &#10092;
              </div>
            </li>
            <li>
              <div className="pagination-item active">1</div>
            </li>
            <li>
              <div className="pagination-item">2</div>
            </li>
            <li>
              <div className="pagination-item active">...</div>
            </li>
            <li>
              <div className="pagination-item">12</div>
            </li>
            <li>
              <div className="pagination-item">
                &#10093;
              </div>
            </li>
          </ul>
        </div>
      )}
    </main>
  )
}

export default Main;