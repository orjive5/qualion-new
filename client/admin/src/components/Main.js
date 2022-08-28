import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import './Main.css'

const Main = () => {
  const [allData, setAllData] = useState([]);

  const getAllData = () => {
    axios
        .get('http://localhost:8000/posts')
        .then((res) => {
            setAllData(res.data.reverse())
        })
        .catch((err) => console.log(err, 'Arrgh, it\'s an error...'))
  }

  useEffect(() => { getAllData() }, []);
  
  const postListings = allData.map((singleData) => {
    const timestamp = new Date(singleData.createdAt).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      }
    )
      return (
        <article key={singleData._id} className='post-article'>
          <Link to={`/posts/${singleData._id}`}>
          <img
              src={singleData.imageUrl}
              alt=""
            />
          </Link>
          <div className="article-details">
            <Link to={`/posts/${singleData._id}`} style={{ textDecoration: 'none' }}>
              <h1 className="article-title">{singleData.title}</h1>
            </Link>
            <h1 className="article-published">
              {singleData.isPublished ? 'Post published' : 'Not published'}
            </h1>
            <p>{timestamp}</p>
            <p>#{singleData.tags.join(' #')}</p>
          </div>
        </article>
      )
  })
  return (
    <main>
      <section className="display-posts">
        {postListings}
            </section>
        </main>
  )
}

export default Main;