import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Avatar,
} from "@mui/material";



function DiscussionPage() {
  const { id } = useParams(); // get post ID from URL
  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [image, setImage] = useState(null);

 // Fetch post + comments on mount
  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then(setPost);

    fetch(`http://localhost:5000/api/comments/${id}`)
      .then((res) => res.json())
      .then(setComments);
  }, [id]);

   const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem("token"); // JWT from login
    const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newComment }),
    });

    if (res.ok) {
      const comment = await res.json();
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  if (!post) return <Typography>Loading...</Typography>;
  return (
    <Box maxWidth="md" mx="auto" p={3}>
      {/* Post details */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Posted by {post.author?.email}
        </Typography>
        <Typography variant="body1">{post.content}</Typography>
      </Paper>


      {/* Comments section */}
      <Typography variant="h6" gutterBottom>
        Discussion
      </Typography>

      <Stack spacing={2} mb={3}>
        {comments.length > 0 ? (
          comments.map((c) => (
            <Paper key={c._id} sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar>{c.author?.email[0]}</Avatar>
                <Box>
                  <Typography fontWeight="bold">{c.author?.email}</Typography>
                  <Typography>{c.text}</Typography>
                </Box>
              </Stack>
            </Paper>
          ))
        ) : (
          <Typography color="text.secondary">No comments yet.</Typography>
        )}
      </Stack>

      {/* Add new comment */}
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
