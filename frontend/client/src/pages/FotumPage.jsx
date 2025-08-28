import { Link as RouterLink } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Grid,
  Container,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function FotumPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false); // modal state
  const [newPost, setNewPost] = useState({ title: "", author: "" });
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token")); // grab JWT if user logged in

  // Fetch posts on mount
  useEffect(() => {
    axios
      .get("https://project-final-7wgo.onrender.com/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle opening and closing modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewPost({ title: "", author: "" }); // reset form
  };

  // Handle new post submission
  const handleAddPost = () => {
    if (!token) {
      alert("You must be logged in to create a post.");
      return;
    }
    if (newPost.title.trim() && newPost.content.trim()) {
      axios
        .post("https://project-final-7wgo.onrender.com/api/posts", newPost, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setPosts([res.data, ...posts]); // add new post on top
          handleClose();
        })
        .catch((err) => {
          console.error(err);
          alert(err.response?.data?.error || "Failed to create post.");
        });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header Section */}
      <Grid container justifyContent="space-between" alignItems="center" mb={4}>
        <Grid item xs={12} sm="auto">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Forum
          </Typography>
          {token && (
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                backgroundColor: "#0077B6",
                "&:hover": { backgroundColor: "#005f91" },
              }}
            >
              + New Post
            </Button>
          )}
        </Grid>
      </Grid>

      {/* Search Bar */}
      <Box mb={4}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Posts List */}
      {/* Post list */}
      <Stack spacing={3}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Paper key={post._id} sx={{ p: 3, borderRadius: 2 }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Posted by {post.author?.email || "Unknown"}
                  </Typography>
                </Grid>
                <Button
                  component={RouterLink}
                  to={`/post/${post._id}`}
                  variant="contained"
                  size="small"
                >
                  View discussion →
                </Button>
              </Grid>
            </Paper>
          ))
        ) : (
          <Typography align="center" color="text.secondary">
            No posts found.
          </Typography>
        )}
      </Stack>

      {/* Create Post Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create a New Post</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title"
              fullWidth
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <TextField
              label="Content"
              fullWidth
              multiline
              rows={4}
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPost} variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default FotumPage;
