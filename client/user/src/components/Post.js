import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Post.css'
import PostLoader from './PostLoader';

const Post = () => {

    const loadPosts = () => {
        axios.get('http://localhost:8000/posts')
            .then(function (response) {
                const post = response.data.find((post) => post._id === postId);
                setPost(post);
                const latest = response.data.slice(-3)
                setLatestPosts(latest);
            })
            .catch((err) => console.log(err, 'it has an error'))
            .finally(() => setLoading(false))
    }

    const navigate = useNavigate();

    const { postId } = useParams();

    const [post, setPost] = useState([]);
    useEffect(() => { loadPosts() }, []);

    const [latestPosts, setLatestPosts] = useState([]);

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //   }, [])

    const displayLatest = latestPosts.map(latest => {

        //FIX: Link changes URL, but doesn't rerender the component, changePost is temporary solution
        //ALSO FIX: When component is rendered, it should be at the top of the page...
        const changePost = () => {
            navigate(`/posts/${latest._id}`);
            window.location.reload(false);
            // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }
        return (
                <div onClick={changePost} className='latest-post' key={latest._id}>
                    <img
                        src={latest.imageUrl}
                        alt=""
                    />
                    <h1>{latest.title}</h1>
                </div>
        )
    })

    const [isLoading, setLoading] = useState(true);
    
    return (
        <div className="post">
            <Header />
            {isLoading ? <PostLoader />
                : (
                    <div className='post-main'>
                        <div className='post-header' >
                            <img
                                src={post.imageUrl}
                                alt=""
                            />
                            <div className='post-title'>
                                <h1><span>{post.title}</span></h1>
                            </div>
                        </div>
                        <div className='post-container'>
                            <div className='post-body'>
                                <p>{post.text}</p>
                            </div>
                            <div className='latest-posts'>
                                {displayLatest}
                            </div>
                        </div>
                    </div>
                )
            }
            <Footer />
        </div>
    );
}

export default Post;