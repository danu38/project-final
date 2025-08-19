import { AppBar,Box, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import TechnigoLogo from "../assets/technigologo.png";

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#0077B6" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: App name */}
  {/* Left side: Logo */}
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Box
            component="img"
            src={TechnigoLogo}
            alt="Techinigo Logo"
            sx={{ height: 40 }}
          />
        </Box>

        {/* Right side: Nav links */}
        <Stack direction="row" spacing={2}>
          <Button
            component={RouterLink}
            to="/"
            sx={{ color: "white", textTransform: "none" }}
          >
            Forum
          </Button>
          <Button
            component={RouterLink}
            to="/login"
            sx={{ color: "white", textTransform: "none" }}
          >
            Login
          </Button>
          <Button
            component={RouterLink}
            to="/signup"
            sx={{ color: "white", textTransform: "none" }}
          >
            Signup
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
