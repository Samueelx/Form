import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom"; // For navigation after successful reset

const ResetPassword = (): React.JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation (optional, add checks for email format and password length)
    if (!email || !password) {
      setErrorMessage("Please enter your email and new password.");
      return;
    }

    try {
      const response = await fetch(
        "https://form-api-68gd.onrender.com/api/v1/reset-password",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Password reset successful!");
        navigate("/login"); // Redirect to login page after success
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "An error occurred.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
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
        Reset Password
      </Typography>
      {errorMessage && (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )}
      {successMessage && (
        <Typography variant="body2" color="success">
          {successMessage}
        </Typography>
      )}
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
          label="New Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, width: "100%" }}>
          Reset Password
        </Button>
      </form>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Typography variant="body2">
          Back to Login?{" "}
          <Link component="button" onClick={() => navigate("/login")} underline="none" sx={{ color: "primary.main" }}>
            Log In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPassword;
