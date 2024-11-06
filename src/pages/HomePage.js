// // src/pages/HomePage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await axios.get('/api/posts');
//       setPosts(response.data);
//     };
//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <h1>Blog Posts</h1>
//       {posts.map((post) => (
//         <div key={post._id}>
//           <h2>{post.title}</h2>
//           <p>{post.content.substring(0, 100)}...</p>
//           <Link to={`/posts/${post._id}`}>Read more</Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:5000/api/posts/');
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Blog Posts</h1>
      <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p className="card-text">{post.content.substring(0, 100)}...</p>
                <Link to={`/posts/${post._id}`} className="btn btn-primary">
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

