import { useContext,useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import {Link} from '@mui/material';
function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");
  let user_id: string | undefined;
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const toggleHover = () => {
    setIsHovered(prevState => !prevState);
   };

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
                <Link className="nav-link" aria-current="page" href="/"  underline='none' color="inherit">Home</Link>
              {token === null &&
                <>
                    <Link className="nav-link" href="/login" underline='none' color="inherit">Login</Link>
                    <Link className="nav-link" href="/register"  underline='none' color="inherit">Register</Link>
                </>
              }
              {token !== null &&
                <>
                    <Link className="nav-link" href="/dashboard" underline='none' color="inherit">Dashboard</Link>
                    <Link className="nav-link" href="/watchlist" underline='none' color="inherit">Watchlist</Link>
                    <Link className="nav-link" onClick={logoutUser} underline='none' style={{cursor:'pointer'}} color="inherit">Logout</Link>
                </>
              }
            </Box>
          </Toolbar>
        </AppBar>
      
  );
}

export default Navbar;
