import { Link } from "react-router-dom";

function FotumPage() {
  const dummyPosts = [
    { id: 1, title: "How do I fix this React bug?", author: "Alice" },
    { id: 2, title: "Best resources for learning Node.js?", author: "Bob" },
    {
      id: 3,
      title: "What’s the difference between useState and useReducer?",
      author: "Charlie",
    },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Forum</h1>
      <div className="space-y-4">
        {dummyPosts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg hover:shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">Posted by {post.author}</p>
            <Link to={`/post/${post.id}`} className="text-blue-600 text-sm">
              View discussion →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FotumPage;
