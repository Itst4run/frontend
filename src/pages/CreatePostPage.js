// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';

// const CreatePostPage = () => {
//   const { token,email } = useContext(AuthContext);
//   const [form, setForm] = useState({ title: '', content: '' });
//   const [posts, setPosts] = useState([]);
//   const [editPostId, setEditPostId] = useState(null);
// console.log("email",email);
//   // Fetch posts specific to the user when the component mounts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/posts/filter', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setPosts(response.data); // Assuming the API returns only the user's posts
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };
//     fetchPosts();
//   }, [token]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editPostId) {
//         // Update post
//         await axios.put(`http://localhost:5000/api/posts/${editPostId}`, form,email, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } else {
//         // Create new post
//         await axios.post('http://localhost:5000/api/posts', { ...form, author: email }, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       }
//       // Reset form after submission
//       setForm({ title: '', content: '' });
//       setEditPostId(null);
//       // Re-fetch posts
//       const response = await axios.get('http://localhost:5000/api/posts', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPosts(response.data);
//     } catch (error) {
//       console.error('Error creating or updating post:', error);
//     }
//   };

//   const handleEdit = (post) => {
//     setForm({ title: post.title, content: post.content });
//     setEditPostId(post._id); // Set ID for the post to be edited
//   };

//   const handleDelete = async (postId) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
  
//       // Check if the deletion was successful
//       if (response.status === 200) {
//         alert('Post deleted successfully!'); // Alert for successful deletion
//       }
  
//       // Re-fetch posts after deletion
//       const updatedPostsResponse = await axios.get('http://localhost:5000/api/posts/filter', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPosts(updatedPostsResponse.data);
//     } catch (error) {
//       console.error('Error deleting post:', error);
//       alert('Failed to delete post.'); // Optionally alert the user about the error
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
//         <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required></textarea>
//         <button type="submit">{editPostId ? 'Update Post' : 'Create Post'}</button>
//       </form>
      
//       <h2>Your Posts</h2>
//       <ul>
//         {posts.map(post => (
//           <li key={post._id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             <button onClick={() => handleEdit(post)}>Edit</button>
//             <button onClick={() => handleDelete(post._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CreatePostPage;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CreatePostPage = () => {
  const { token, email } = useContext(AuthContext);
  const [form, setForm] = useState({ title: '', content: '' });
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);

  // Fetch posts specific to the user when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editPostId) {
        // Update post
        await axios.put(`http://localhost:5000/api/posts/${editPostId}`, { ...form }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create new post
        await axios.post('http://localhost:5000/api/posts', { ...form }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ title: '', content: '' });
      setEditPostId(null);
      const response = await axios.get('http://localhost:5000/api/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error creating or updating post:', error);
    }
  };

  const handleEdit = (post) => {
    setForm({ title: post.title, content: post.content });
    setEditPostId(post._id);
  };

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert('Post deleted successfully!');
      }

      const updatedPostsResponse = await axios.get('http://localhost:5000/api/posts/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(updatedPostsResponse.data);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post.');
    }
  };

  return (
    <div className="container my-4">
      <div className="card p-4 mb-4">
        <h2 className="mb-3">{editPostId ? 'Edit Post' : 'Create Post'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="form-control"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              name="content"
              className="form-control"
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            {editPostId ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </div>

      <h2>Your Posts</h2>
      <ul className="list-group">
        {posts.map(post => (
          <li key={post._id} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <h5 className="mb-1">{post.title}</h5>
              <p className="mb-1">{post.content}</p>
            </div>
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(post)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreatePostPage;
