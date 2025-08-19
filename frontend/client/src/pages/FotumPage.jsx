import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
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

  const [posts, setPosts] = useState([
    { id: 1, title: "How do I fix this React bug?", author: "Alice" },
    { id: 2, title: "Best resources for learning Node.js?", author: "Bob" },
    {
      id: 3,
      title: "What’s the difference between useState and useReducer?",
      author: "Charlie",
    },
  ]);

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
    if (newPost.title.trim() && newPost.author.trim()) {
      const newId = posts.length + 1;
      setPosts([...posts, { id: newId, ...newPost }]);
      handleClose();
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
        </Grid>
        <Grid item xs={12} sm="auto">
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
      <Stack spacing={3}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Paper
              key={post.id}
              elevation={3}
              sx={{ p: 3, borderRadius: 2, "&:hover": { boxShadow: 6 } }}
            >
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={8}>
                  <Typography variant="h6" fontWeight="medium">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Posted by {post.author}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "flex-start", sm: "flex-end" },
                    mt: { xs: 1, sm: 0 },
                  }}
                >
                  <Button
                    component={RouterLink}
                    to={`/post/${post.id}`}
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#0077B6",
                      "&:hover": { backgroundColor: "#005f91" },
                    }}
                  >
                    View discussion →
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" align="center">
            No posts found.
          </Typography>
        )}
      </Stack>

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
              label="Author"
              fullWidth
              value={newPost.author}
              onChange={(e) =>
                setNewPost({ ...newPost, author: e.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleAddPost}
            variant="contained"
            sx={{
              backgroundColor: "#0077B6",
              "&:hover": { backgroundColor: "#005f91" },
            }}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default FotumPage;
