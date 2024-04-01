// import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, Typography } from '@mui/material';

import { testUsers } from './data';

function UserDataTable() {
    /** 
  const [users, setUsers] = useState([]); // Array to store user data


  // Function to simulate fetching user data (replace with your actual data fetching logic)
  const fetchUsers = async () => {
    const response = await fetch('https://your-api-endpoint.com/users'); // Replace with your API endpoint
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Fetch data on component mount
  */

  const handleAction = (action: string, userId: string) => {
    // Handle update and delete actions based on the selected option
    if (action === 'Update') {
      // Handle update logic for the specific user (e.g., navigate to edit page)
      console.log("Update user with ID:", userId);
    } else if (action === 'Delete') {
      // Handle delete logic for the specific user (e.g., send delete request to server)
      console.log("Delete user with ID:", userId);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h2" sx={{ fontSize: "2rem", textAlign: "center" }}>User Data</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 700}}>First Name</TableCell>
              <TableCell sx={{fontWeight: 700}}>Last Name</TableCell>
              <TableCell sx={{fontWeight: 700}}>Age</TableCell>
              <TableCell sx={{fontWeight: 700}}>Town</TableCell>
              <TableCell sx={{fontWeight: 700}}>Gender</TableCell>
              <TableCell sx={{fontWeight: 700}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.town}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>
                  <Select
                    value=""
                    onChange={(e) => handleAction(e.target.value, user.id)}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Update">Update</MenuItem>
                    <MenuItem value="Delete">Delete</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserDataTable;
