import React from 'react';
import {  Container, Typography, Button, Box, Link } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {useTheme} from '@mui/material/styles';
import { inherits } from 'util';


const Homepage: React.FC = () => {
  const theme = useTheme();
  return (
    <div>
      <main 
      style={{
        marginTop: theme.spacing(8),
      }}
      >
        <div 
          style={{
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6),
          }}
        >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Hello, Everyone!
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph >
              I designed this stock monitoring platform where a user can login and monitor stock information.
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph >
              You can search your desired stocks in the<Link href='/dashboard' underline='none'> Dashboard </Link>section and add to your watchlist
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph >
              You can also check and manage your favorite stocks in the<Link href='/watchlist' underline='none'> Watchlist </Link>section
            </Typography>
            <Box 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 3,
            }}>
              <Button variant="contained" color="primary" href="/dashboard"
               endIcon={<KeyboardDoubleArrowRightIcon/>} size='large'>
                GET STARTED
              </Button>
            </Box>
          </Container>
        </div>
      </main>
    </div>
  );
}

export default Homepage;
