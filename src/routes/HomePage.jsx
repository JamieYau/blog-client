import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the list of blog posts from your API
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.data); // Assuming the response contains an array of posts

        // Fetch the author's name for each post
        const postsWithAuthors = await Promise.all(
          data.data.map(async (post) => {
            const authorResponse = await fetch(
              `http://localhost:3000/api/users/${post.authorId}`
            );
            if (!authorResponse.ok) {
              throw new Error("Failed to fetch author details");
            }
            const authorData = await authorResponse.json();
            return {
              ...post,
              author: authorData.data.username, // Assuming the response contains the author's username
            };
          })
        );
        setPosts(postsWithAuthors);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // Run once on component mount

  return (
    <div className="Home">
      <h2>Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link> by {post.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
