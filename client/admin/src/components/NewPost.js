import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './NewPost.css'
import { Editor } from '@tinymce/tinymce-react';
import Icon from '@mdi/react'
import { mdiCloudUpload } from '@mdi/js'

const NewPost = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8000/protected', {
            headers: {
            Authorization: token,
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
            navigate('/login')
        })
    }, [])

    const [postTitle, setPostTitle] = useState('');
    const [postSubtitle, setPostSubtitle] = useState('');
    const [postTags, setPostTags] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [postStatus, setPostStatus] = useState('');
    const inputFileRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        axios.post('http://localhost:8000/posts', {
            title: postTitle,
            subtitle: postSubtitle,
            tags: postTags,
            text: contentEditor,
            imageUrl: imageUrl,
            }, {
                headers: {
                    Authorization: token,
                }
            })
            .then((response) => {
                console.log(response)
                setPostTitle('');
                setPostSubtitle('');
                setContentEditor('');
                setPostTags([]);
                inputFileRef.current.value = '';
                setImageUrl('')
                setPostStatus('Post created successfully!');
            }).catch(err => {
                setPostStatus('Error, enter valid data!')
                console.log(err)
            })
    }

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const token = localStorage.getItem('token');
            const { data } = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    Authorization: token,
                }
            })
            setImageUrl(`http://localhost:8000${data.url}`)
            console.log(data)
        } catch (err) {
            console.warn(err);
            alert('Failed to upload a file!')
        }
    }

    //TinyMCS setup
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const [contentEditor, setContentEditor] = useState('');
    const handleEditorChange = (content, editor) => {
        setContentEditor(content);
    }

    //Capitalize every word in the title
    const capitalizeCase = () => {
        return postTitle.split(' ').map(el => {
            return el.toLowerCase();
        }).map(el => {
            return el.slice(0,1).toUpperCase() + el.slice(1)
        }).join(' ')
    }
    
    //Handle Tags
    const handleTagEnter = (e) => {

        if (e.key === 'Enter') {
            setPostTags([
                ...postTags,
                e.target.value,
            ])
            e.target.value = ''
        }
    }

    return (
        <div className='create-new-post'>
            <h1>Create new post</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <hr></hr>
                <div className='title-input'>
                    <input
                        placeholder='Title'
                        type='text'
                        required
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                    />
                    <button type="button" onClick={() => setPostTitle(capitalizeCase())}>Capitalize Title</button>
                </div>
                <div className='subtitle-input'>
                    <input
                        placeholder='Subtitle'
                        type='text'
                        required
                        value={postSubtitle}
                        onChange={(e) => setPostSubtitle(e.target.value)}
                    />
                </div>
                <>
                    <Editor
                        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue='<p>Post text</p>'
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }'
                        }}
                        value={contentEditor}
                        onEditorChange={handleEditorChange}
                    />
                </>
                <div className='add-tags'>
                    <input
                        placeholder='Press enter to add a tag'
                        type='text'
                        onKeyDown={handleTagEnter}
                    >
                    </input>
                </div>
                <div className='added-tags'>
                    {postTags.length !== 0 && postTags.map(el => {
                        return (
                            <div key={el} className='added-tag'>
                                <p>{el}</p>
                                <div
                                    className='close-tag'
                                    onClick={() => { setPostTags(postTags.filter(e => e !== el)) }}
                                >
                                    &times;
                                </div>
                            </div>
                        )
                    })}
                </div>
                <label className='custom-file-upload'>
                    <Icon path={mdiCloudUpload}
                        title="User Profile"
                        size='2rem'
                        color="white"
                    />
                    Upload image
                    <input
                        name='upload-file'
                        ref={inputFileRef}
                        required
                        type='file'
                        filename='img'
                        onChange={handleChangeFile}
                    />
                </label>
                {imageUrl !== '' && (
                    <p className='uploaded-image'>Uploaded: {imageUrl.replace('http://localhost:8000/uploads/', '')}</p>
                )}
                <input className='submit-button' type='submit' />
            </form>
            <p className='post-status'>{postStatus}</p>
        </div>
    )
}

export default NewPost;