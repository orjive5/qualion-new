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
            setAllData(publishedPosts)
        })
        .catch((err) => console.log(err, 'Arrgh, it\'s an error...'))
  }

  const [allData, setAllData] = useState([]);
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
            <h1 className="post-listing-title">{singleData.title}</h1>
          </Link>
          <p>{singleData.subtitle}</p>
          <p>{timestamp}</p>
          <p>#{singleData.tags.join(' #')}</p>
        </div>
      </article>
    )
  }).reverse()
  
  return (
    <main className="main-content">
      <section className="display-posts">
        {postListings}
      </section>
    </main>
  )
}

export default Main;