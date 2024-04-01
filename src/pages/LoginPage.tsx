import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';

const LoginPage = (): React.JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle login logic here (e.g., send data to server for authentication)
    console.log("Login attempted with:", { username, password });
    // You can add validation and error handling here before login attempt
    setUsername(''); // Clear form fields after submission (optional)
    setPassword('');
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",flexDirection: "column", marginY: "4rem", width: "50vw", margin: "0 auto" }}>
      <Typography variant="h2" sx={{ fontSize: "2rem" }}>Login</Typography>
      {/* {errorMessage && (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )} */}
      <form onSubmit={handleSubmit} style={{width: "50%"}}>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <Button type="submit" variant="contained" sx={{ mt: 3, width: '100%' }}>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default LoginPage;
