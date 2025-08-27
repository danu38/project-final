import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Paper,
  Grid,
  Stack,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import TechnigoLogo from "../assets/technigologo.png";
import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
      });

      setSuccess("Signup successful! Redirecting to login...");

      // Redirect after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Try again.");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", bgcolor: "#f3f4f6", p: 2 }}
    >
      <Grid item xs={12} sm={8} md={5} lg={4}>
        <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
          {/* Technigo Logo */}
          <Box display="flex" justifyContent="center" mb={2}>
            <img
              src={TechnigoLogo}
              alt="Technigo Logo"
              style={{ width: "120px", height: "auto" }}
            />
          </Box>

          <Typography variant="h4" align="center" mb={3}>
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {error && (
                <Typography color="error" align="center">
                  {error}
                </Typography>
              )}
              {success && (
                <Typography color="primary" align="center">
                  {success}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#0077B6",
                  "&:hover": {
                    backgroundColor: "#005f91",
                  },
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </form>

          <Typography variant="body2" align="center" mt={2}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" underline="hover">
              Log in
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SignupPage;
