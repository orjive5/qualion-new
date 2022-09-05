import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Main.css';
import MainLoader from './MainLoader';

const Main = ({ foundData, activeTag, setActiveTag, currentPage, setCurrentPage }) => {
  const [allData, setAllData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState([]);
  const [activeData, setActiveData] = useState([]);

  const getAllData = () => {
    axios
      .get('https://qualion-blog.herokuapp.com/posts')
      .then((res) => {
        const publishedPosts = res.data.filter((element) => element.isPublished).reverse();
        setAllData(publishedPosts);
        setActiveData(publishedPosts);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const getAllTags = () => {
    const getTags = allData.map((el) => el.tags).flat();
    setAllTags([...new Set(getTags)]);
  };

  const activeTagData = () => {
    setActiveData(
      allData.filter((el) => {
        if (el.tags.includes(activeTag)) {
          return el;
        }
      })
    );
  };

  useEffect(() => {
    getAllData();
    getAllTags();
  }, []);

  useEffect(() => {
    activeTagData();
  }, [activeTag]);

  useEffect(() => {
    if (foundData.length !== 0) {
      setActiveData(foundData);
    }
  }, [foundData]);

  //PAGINATION
  const [postsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = activeData.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const totalPosts = activeData.length;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  //LOOP THROUGH POST LISTINGS TO DISPLAY THEM
  const postListings = currentPosts.map((singleData) => {
    const timestamp = new Date(singleData.createdAt).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });

    const postTags = singleData.tags.map((el) => {
      return `#${el.trim()}`;
    });

    const selectTag = (el) => {
      setCurrentPage(1);
      setActiveTag(`${el.substring(1)}`);
    };

    const displayTags = postTags.map((el) => {
      return (
        <p onClick={() => selectTag(el)} className="tags-paragraph" key={`${el}${singleData._id}`}>
          {el}
        </p>
      );
    });

    return (
      <article key={singleData._id} className="post-listing">
        <Link to={`/posts/${singleData._id}`}>
          <div className="post-listing-image-container">
            <img src={singleData.imageUrl} alt="" className="post-listing-image" />
          </div>
        </Link>
        <div className="post-listing-details">
          <hr></hr>
          <Link to={`/posts/${singleData._id}`} style={{ textDecoration: 'none' }}>
            <h1 className="post-listing-title">{singleData.title}</h1>
          </Link>
          <p className="subtitle-paragraph">{singleData.subtitle}</p>
          <div className="date-and-tags">
            <p className="time-paragraph">{timestamp}</p>
            <div>{displayTags}</div>
          </div>
        </div>
      </article>
    );
  });

  const DisplayActiveTag = () => {
    return (
      <div className="active-tag">
        <h1>
          <span className="hashtag">#</span>
          {activeTag}
        </h1>
        <button
          onClick={() => {
            setActiveTag('');
            getAllData();
          }}>
          Clear
        </button>
      </div>
    );
  };

  const DisplayPagination = () => {
    const previousPage = () => {
      return currentPage > 1 && setCurrentPage((current) => current - 1);
    };

    const nextPage = () => {
      return currentPage < pageNumbers.length && setCurrentPage((current) => current + 1);
    };

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
      <div className="pagination-container">
        <ul className="pagination">
          <li>
            <div onClick={previousPage} className="pagination-item">
              &#10092;
            </div>
          </li>
          {pageNumbers.map((page) => {
            return (
              <li key={page}>
                <div
                  onClick={() => page !== currentPage && setCurrentPage(page)}
                  className={`pagination-item ${page === currentPage && 'active'}`}>
                  {page}
                </div>
              </li>
            );
          })}
          <li onClick={nextPage}>
            <div className="pagination-item">&#10093;</div>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <main className="main-content">
      {activeTag !== '' && <DisplayActiveTag />}
      <section className="display-posts">
        {isLoading ? (
          <div className="main-loader">
            <MainLoader />
            <MainLoader />
          </div>
        ) : (
          postListings
        )}
      </section>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <DisplayPagination />
      )}
    </main>
  );
};

export default Main;
