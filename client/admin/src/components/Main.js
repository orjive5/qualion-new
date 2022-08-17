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
  
  return (
    <main className="main">
      <section className="display-posts">
                {allData.map((singleData) => {
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
                        <p>{singleData.text}</p>
                        <p>#{singleData.tags.join(' #')}</p>
                      </article>
                    )
                })}
            </section>
        </main>
  )
}

export default Main;