import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import './Main.css'

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
  }

  const [allData, setAllData] = useState([]);
  useEffect(() => { getAllData() }, []);

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
  
  console.log(activeTag);

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

    const removeTags = () => {
      setActiveTag('');
      getAllData();
    }

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
  
  return (
    <main className="main-content">
      {activeTag !== '' && (
        <div>
          <h1>{activeTag}</h1>
          <button
            onClick={() => {
            setActiveTag('');
            getAllData();
            }}>
            Remove tag
          </button>
        </div>
      ) }
      <section className="display-posts">
        {postListings}
      </section>
    </main>
  )
}

export default Main;