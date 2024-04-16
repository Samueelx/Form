import { Box, Typography, TextField, Button, Link } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [town, setTown] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const navigate = useNavigate();

  const genders = ["Male", "Female"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setDisable(true);

    const userData = {
      firstName,
      lastName,
      email,
      password,
      age,
      town,
      gender,
    };
    console.log(userData);
    /**Send data to the api */
    // Inside handleSubmit:
    try {
      const response = await fetch(
        "https://form-api-68gd.onrender.com/api/v1/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      console.log("data: ", data);

      if (response.ok) {
        // Handle successful signup: clear fields, display success message, redirect, etc.
        navigate("/login");
      } else {
        // Handle errors: display error messages from data.error
      }
    } catch (error) {
      // Handle network errors or other issues
    }
  };

  const handleSignup = () => {
    setLoading(true);
    setDisable(false);
    navigate("/login");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginY: "2rem",
          width: "50vw",
          margin: "0 auto",
          gap: 0.5,
        }}
      >
        <Typography variant="h2" sx={{ fontSize: "2rem" }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "50%" }}>
          <TextField
            label="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={disable}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={disable}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={disable}
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
            disabled={disable}
          />
          <TextField
            label="Town"
            variant="outlined"
            margin="normal"
            fullWidth
            value={town}
            onChange={(e) => setTown(e.target.value)}
            required
            disabled={disable}
          />
          <TextField
            label="Gender"
            select
            variant="outlined"
            margin="normal"
            fullWidth
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            disabled={disable}
          >
            {genders.map(gender => (
              <MenuItem value={gender}>{gender}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={disable}
          />
          {loading ? (
            <Box sx={{display: 'flex', justifyContent:"center"}}>
              <CircularProgress size="2rem"/>
            </Box>
          ) : (
            <>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, width: "100%" }}
              >
                Sign Up
              </Button>
            </>
          )}
        </form>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={handleSignup}
              underline="none"
              sx={{ color: "primary.main" }}
            >
              Log In
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default App;
