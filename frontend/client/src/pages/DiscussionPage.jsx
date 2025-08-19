import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Avatar,
} from "@mui/material";

// dummy post data
const dummyPosts = [
  {
    id: 1,
    title: "How do I fix this React bug?",
    author: "Alice",
    description:
      "I'm getting an error when trying to update state inside useEffect.",
  },
  {
    id: 2,
    title: "Best resources for learning Node.js?",
    author: "Bob",
    description: "Looking for good beginner-friendly tutorials and guides.",
  },
  {
    id: 3,
    title: "What’s the difference between useState and useReducer?",
    author: "Charlie",
    description:
      "I want to understand when to use one over the other in React.",
  },
];

function DiscussionPage() {
  const { id } = useParams(); // get post ID from URL
  const post = dummyPosts.find((p) => p.id === Number(id));

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [image, setImage] = useState(null);

  const handleAddComment = () => {
    if (newComment.trim() || image) {
      const newEntry = {
        id: comments.length + 1,
        text: newComment,
        image: image,
        author: "You",
      };
      setComments([...comments, newEntry]);
      setNewComment("");
      setImage(null);
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  if (!post) {
    return <Typography variant="h6">Post not found</Typography>;
  }

  return (
    <Box maxWidth="md" mx="auto" p={3}>
      {/* Post details */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Posted by {post.author}
        </Typography>
        <Typography variant="body1">{post.description}</Typography>
      </Paper>

      {/* Comments section */}
      <Typography variant="h6" gutterBottom>
        Discussion
      </Typography>

      <Stack spacing={2} mb={3}>
        {comments.map((c) => (
          <Paper key={c.id} sx={{ p: 2, borderRadius: 2 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar>{c.author[0]}</Avatar>
              <Box>
                <Typography fontWeight="bold">{c.author}</Typography>
                <Typography>{c.text}</Typography>
                {c.image && (
                  <Box mt={1}>
                    <img
                      src={c.image}
                      alt="comment upload"
                      style={{ maxWidth: "200px", borderRadius: "8px" }}
                    />
                  </Box>
                )}
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>

      {/* Add new comment */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Add a Comment
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Button variant="outlined" component="label">
            Upload Image
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
            />
          </Button>
          {image && (
            <Typography color="text.secondary">Image ready ✔</Typography>
          )}
        </Stack>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0077B6",
            "&:hover": { backgroundColor: "#005f91" },
          }}
          onClick={handleAddComment}
        >
          Post Comment
        </Button>
      </Paper>
    </Box>
  );
}

export default DiscussionPage;
