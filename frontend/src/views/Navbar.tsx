import React, { useContext } from 'react';
// import jwt_decode from "jwt-decode";
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../context/AuthContext';
// import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import {Link} from '@mui/material';
function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");
  let user_id: string | undefined;

  if (token) {
    const decoded: any = jwtDecode(token);
    user_id = decoded.user_id;
  }

  return (
    
        <AppBar position="fixed" >
          <Toolbar sx={{marginRight:2,marginLeft:1, marginTop:1}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href='/'>
                <img style={{ width: "70px", padding: "6px" }} src="../../logo192.png" alt="" />
              </Link>
            </Typography>
            <Box style={{display:"flex", gap:"15px", justifyContent:"center",alignItems:"center"}}>
                <Link className="" aria-current="page" href="/" color="inherit"  underline='none'>Home</Link>
              {token === null &&
                <>
                    <Link className="nav-link" href="/login" color="inherit"  underline='none' >Login</Link>
                    <Link className="nav-link" href="/register" color="inherit"  underline='none'>Register</Link>
                </>
              }
              {token !== null &&
                <>
                    <Link color="inherit" href="/dashboard" underline='none'>Dashboard</Link>
                    <Link color="inherit" href="/watchlist" underline='none'>Watchlist</Link>
                    <Link color="inherit" href="/login" onClick={logoutUser} underline='none'>Logout</Link>
                </>
              }
            </Box>
          </Toolbar>
        </AppBar>
      
  );
}

export default Navbar;
