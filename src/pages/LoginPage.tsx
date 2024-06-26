import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography, Link } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const LoginPage = (): React.JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // Handle login logic here (e.g., send data to server for authentication)
    // Inside handleSubmit:
    try {
      const response = await fetch(
        "https://form-api-68gd.onrender.com/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      // Handle response appropriately
      const data = await response.json();
      console.log("data: ", data);
      if (response.ok) {
        const jwtToken = data.token; // Assuming the token is under the "jwt" key
        localStorage.setItem("jwtToken", jwtToken);
        navigate(`/users/${data.userID}`);
      } else {
        // Handle login errors: display error messages
      }
    } catch (error) {
      // Handle any errors during API request
    }

    // You can add validation and error handling here before login attempt
    setEmail(""); // Clear form fields after submission (optional)
    setPassword("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginY: "4rem",
        width: "50vw",
        margin: "0 auto",
      }}
    >
      <Typography variant="h2" sx={{ fontSize: "2rem" }}>
        Login
      </Typography>
      {/* {errorMessage && (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )} */}
      <form onSubmit={handleSubmit} style={{ width: "50%" }}>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Link
            component="button"
            variant="body2"
            underline="none"
            onClick={() => navigate("/forgot-password")}
            sx={{ color: "primary.main" }}
          >
            Forgot password?
          </Link>
        </Box>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress size="2rem" />
          </Box>
        ) : (
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, width: "100%" }}
          >
            Login
          </Button>
        )}
      </form>
    </Box>
  );
};

export default LoginPage;
