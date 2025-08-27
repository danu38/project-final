import { useEffect, useState } from "react";
import { getPosts, createPost } from "../api/api";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch posts on load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getPosts();
        setPosts(data);
      } catch (err) {
        alert("Failed to load posts: " + err.message);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createPost({ title, content });
      setPosts([data, ...posts]); // add new post to top
      setTitle("");
      setContent("");
    } catch (err) {
      alert("Failed to create post: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Forum</h1>

      {/* New Post Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Post title"
          className="w-full border p-2 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your post..."
          className="w-full border p-2 rounded mb-3"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Post
        </button>
      </form>

      {/* Posts List */}
      <div>
        {posts.map((post) => (
          <div key={post._id} className="border rounded p-4 mb-4 shadow-sm">
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}