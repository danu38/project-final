import { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Link,
  Paper,
  Grid,
  Stack,
} from "@mui/material";
import { Link as RouterLink,  useNavigate  } from "react-router-dom";
import TechnigoLogo from "../assets/technigologo.png";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://project-final-7wgo.onrender.com/api/auth/login", {
        email,
        password,
      });

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect to forum
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Try again.");
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
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Box display="flex" justifyContent="center" mb={1}>
            <img
              src={TechnigoLogo}
              alt="Technigo Logo"
              style={{ width: "150px", height: "auto" }}
            />
          </Box>

          <Typography variant="h4" align="center" mb={3}>
            Login
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
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Link href="#" underline="hover">
                  Forgot password?
                </Link>
              </Box>
              {error && (
                <Typography color="error" align="center">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Log In
              </Button>
            </Stack>
          </form>
          <Typography variant="body2" align="center" mt={2}>
            Don’t have an account?{" "}
            <Link component={RouterLink} to="/signup" underline="hover">
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
