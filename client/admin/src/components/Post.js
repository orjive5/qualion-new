import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Post.css'
import { html } from 'js-beautify'

const Post = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState([]);
    const [published, setPublished] = useState(true);
    const [tags, setTags] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [updateTitle, setUpdateTitle] = useState(false);
    const [postSubtitle, setPostSubtitle] = useState('');
    const [updateSubtitle, setUpdateSubtitle] = useState(false);
    const [postText, setPostText] = useState('');
    const [updateText, setUpdateText] = useState(false);

    const loadPosts = () => {
        axios.get('http://localhost:8000/posts')
            .then(function (response) {
                const post = response.data.find((post) => post._id === postId);
                setPost(post);
                setPostTitle(post.title);
                setPostSubtitle(post.subtitle);
                setPostText(post.text);
                setTags(post.tags.map((el => `#${el} `)));
                setPublished(post.isPublished);
            })
            .catch((err) => console.log(err, 'it has an error'));
    }

    const timestamp = new Date(post.createdAt).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    }
    );

    const token = localStorage.getItem('token');
    const headers = { Authorization: token }

    const togglePublished = () => {
        axios.put(`http://localhost:8000/posts/${postId}`, { isPublished: !published }, { headers })
            .then((response) => {
                console.log(response);
                setPublished(!published);
            }).catch(err => {
                console.log(err)
            })
    }

    const updatePost = () => {
        axios.put(`http://localhost:8000/posts/${postId}`, {
            title: postTitle,
            subtitle: postSubtitle,
            text: postText,
        }, { headers })
            .then((response) => {
                console.log(response);
                setUpdateTitle(false);
                setUpdateSubtitle(false);
                setUpdateText(false);
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => { loadPosts() }, []);
    
    return (
        <div className="post">
            <Header />
            <div className='post-main'>
                <img
                    src={post.imageUrl}
                    alt=""
                    width='200px'
                />
                <div className='post-info'>
                    <h1>{postTitle}</h1>
                    <button onClick={() => setUpdateTitle(!updateTitle)}>
                        {updateTitle ? 'Close' : 'Update title'}
                    </button>
                    {updateTitle && (
                        <div>
                            <input
                                type='text'
                                placeholder='Enter new title'
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                            />
                            <button onClick={updatePost}>Update</button>
                        </div>
                    )}
                    <h2>{postSubtitle}</h2>
                    <button onClick={() => setUpdateSubtitle(!updateSubtitle)}>
                        {updateSubtitle ? 'Close' : 'Update subtitle'}
                    </button>
                    {updateSubtitle && (
                        <div>
                            <input
                                type='text'
                                placeholder='Enter new title'
                                value={postSubtitle}
                                onChange={(e) => setPostSubtitle(e.target.value)}
                            />
                            <button onClick={updatePost}>Update</button>
                        </div>
                    )}
                    <p>{postText}</p>
                    <button onClick={() => setUpdateText(!updateText)}>
                        {updateText ? 'Close' : 'Update text'}
                    </button>
                    {updateText && (
                        <div>
                            <textarea
                            type='text'
                            placeholder='Enter new title'
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}></textarea>
                            <button onClick={updatePost}>Update</button>
                        </div>
                    )}
                    <p>{tags}</p>
                    <p>Published: {published ? 'true' : 'false'}</p>
                    <button onClick={togglePublished}>{published ? 'Unpublish post' : 'Publish post'}</button>
                    <p>{timestamp}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Post;