import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [town, setTown] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",flexDirection: "column", marginY: "4rem", width: "50vw", margin: "0 auto" }}>
        <Typography variant="h2" sx={{ fontSize: "2rem" }}>Sign Up</Typography>
        <form onSubmit={handleSubmit} style={{width: "50%"}}>
          <TextField
            label="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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
            label="Age"
            variant="outlined"
            margin="normal"
            fullWidth
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <TextField
            label="Town"
            variant="outlined"
            margin="normal"
            fullWidth
            value={town}
            onChange={(e) => setTown(e.target.value)}
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
            Sign Up
          </Button>
        </form>
      </Box>
    </>
  );
}

export default App;
