import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  age: string;
  town: string;
  gender: string;
}

function UserDataTable() {
  const [users, setUsers] = useState<User>({} as User); // Array to store user data
  const [updateStatus, setUpdateStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const { userID } = useParams();
  const jwtToken = localStorage.getItem("jwtToken");

  const navigate = useNavigate();

  console.log(users);
  console.log("User ID: ", userID);

  useEffect(() => {
    // Function to simulate fetching user data (replace with your actual data fetching logic)
    const fetchUsers = async () => {
      const response = await fetch(
        `https://form-api-68gd.onrender.com/api/v1/users/${userID}`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      ); // Replace with your API endpoint
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, [userID, jwtToken]); // Fetch data on component mount

  const handleAction = (action: string, userId: number) => {
    // Handle update and delete actions based on the selected option
    if (action === "Update") {
      // Handle update logic for the specific user (e.g., navigate to edit page)
      setDeleteStatus(false);
      setUpdateStatus(true);
      console.log("Update user with ID:", userId);
    } else if (action === "Delete") {
      setUpdateStatus(false);
      setDeleteStatus(true);
      handleDeleteUser(userId);
      // Handle delete logic for the specific user (e.g., send delete request to server)
      console.log("Delete user with ID:", userId);
    }
  };
  const handleUpdateUser = async () => {
    const updatedUser = { ...users }; // Copy the user object

    try {
      const response = await fetch(
        `https://form-api-68gd.onrender.com/api/v1/users/${users.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `${jwtToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        // Handle successful update:
        // - Clear edit mode (setIsEdit(false))
        // - Potentially fetch updated user data again
        console.log("User updated successfully!");
        setUpdateStatus(false);
      } else {
        // Handle update errors
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending update request:", error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(
          `https://form-api-68gd.onrender.com/api/v1/users/${userId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `${jwtToken}`,
            },
          }
        );
  
        if (response.ok) {
          console.log("User deleted successfully!");
          // Clear user data after successful deletion (optional)
          setUsers({} as User);
          // You can also refetch the user data list here if applicable to your application logic
          navigate("/login");

        } else {
          console.error("Error deleting user:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending delete request:", error);
      }
    }
  };
  

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsers((prevUsers) => ({ ...prevUsers, firstName: event.target.value }));
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsers((prevUsers) => ({ ...prevUsers, lastName: event.target.value }));
  };
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsers((prevUsers) => ({ ...prevUsers, age: event.target.value }));
  };
  const handleTownChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsers((prevUsers) => ({ ...prevUsers, town: event.target.value }));
  };
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsers((prevUsers) => ({ ...prevUsers, gender: event.target.value }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h2" sx={{ fontSize: "2rem", textAlign: "center" }}>
        User Data
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Age</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Town</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={users.id}>
              {updateStatus ? (
                <TableCell>
                  <TextField
                    id="outlined-basic"
                    placeholder="First Name"
                    variant="outlined"
                    value={users.firstName}
                    onChange={handleFirstNameChange}
                    sx={{ width: "9rem", padding: 0 }}
                  />
                </TableCell>
              ) : (
                <TableCell>{users.firstName}</TableCell>
              )}
              {updateStatus ? (
                <TableCell>
                  <TextField
                    id="outlined-basic"
                    placeholder="Last Name"
                    variant="outlined"
                    value={users.lastName}
                    onChange={handleLastNameChange}
                    sx={{ width: "9rem", padding: 0 }}
                  />
                </TableCell>
              ) : (
                <TableCell>{users.lastName}</TableCell>
              )}
              {updateStatus ? (
                <TableCell>
                  <TextField
                    id="outlined-basic"
                    placeholder="Age"
                    variant="outlined"
                    value={users.age}
                    onChange={handleAgeChange}
                    sx={{ width: "9rem", padding: 0 }}
                  />
                </TableCell>
              ) : (
                <TableCell>{users.age}</TableCell>
              )}
              {updateStatus ? (
                <TableCell>
                  <TextField
                    id="outlined-basic"
                    placeholder="Town"
                    variant="outlined"
                    value={users.town}
                    onChange={handleTownChange}
                    sx={{ width: "9rem", padding: 0 }}
                  />
                </TableCell>
              ) : (
                <TableCell>{users.town}</TableCell>
              )}
              {updateStatus ? (
                <TableCell>
                  <TextField
                    id="outlined-basic"
                    placeholder="Gender"
                    variant="outlined"
                    value={users.gender}
                    onChange={handleGenderChange}
                    sx={{ width: "9rem", padding: 0 }}
                  />
                </TableCell>
              ) : (
                <TableCell>{users.gender}</TableCell>
              )}
              <TableCell>
                <Select
                  value={
                    updateStatus ? "Update" : deleteStatus ? "Delete" : "None"
                  }
                  onChange={(e) => handleAction(e.target.value, users.id)}
                  fullWidth
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="Update">Update</MenuItem>
                  <MenuItem value="Delete">Delete</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {updateStatus ? (
        <Button
          variant="contained"
          onClick={handleUpdateUser}
          sx={{ margin: "1rem", float: "right" }}
        >
          Update
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default UserDataTable;
