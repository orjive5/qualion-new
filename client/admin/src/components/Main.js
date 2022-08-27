import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import './Main.css'

const Main = () => {
  const getAllData = () => {
    axios
        .get('http://localhost:8000/posts')
        .then((res) => {
            setAllData(res.data)
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
        <article key={singleData._id}>
          <Link to={`/posts/${singleData._id}`}>
            <h1>{singleData.title}</h1>
          </Link>
          <Link to={`/posts/${singleData._id}`}>
          <img
              src={singleData.imageUrl}
              alt=""
            />
          </Link>
          <h1>
            {!singleData.isPublished && 'Not published!'}
          </h1>
          <p>{timestamp}</p>
          <p>#{singleData.tags.join(' #')}</p>
        </article>
      )
  }).reverse()
  return (
    <main className="main">
      <section className="display-posts">
        {postListings}
            </section>
        </main>
  )
}

export default Main;