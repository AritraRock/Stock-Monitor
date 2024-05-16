import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Container, Card, CardContent, TextField, Button, Typography, Grid, IconButton, FormControlLabel, Checkbox, Box, CardMedia } from '@mui/material';
// import { AccountCircle } from '@mui/icons-material';
import Navbar from './Navbar';

function Loginpage() {
  const { loginUser } = useContext(AuthContext);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const toggleHover = () => {
    setIsHovered(prevState => !prevState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    if (email.length > 0) {
      loginUser(email, password);
    }

    console.log(email);
    console.log(password);
  };

  return (
    <Box>
        <Navbar></Navbar>
        <Container style={{marginTop:'20px'}}>
          <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={5}>
              <Card raised>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <CardMedia
                      component="img"
                      alt="Login form"
                      image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      title="Login form"
                      style={{height:'100%'}}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        Welcome to 
                      </Typography>
                      <Typography variant="h5" component="h2">
                        <b>Stock Monitor👋</b>
                      </Typography>
                      <form onSubmit={handleSubmit}>
                        
                        <TextField
                          id="form2Example17"
                          label="Email address"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          name="email"
                        />
                        <TextField
                          id="form2Example27"
                          label="Password"
                          type="password"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          name="password"
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          fullWidth
                          style={{ marginTop: 20 }}
                        >
                          Login
                        </Button>
                      </form>
                      <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: 10 }}>
                        <Link to="/register" style={{ 
                          textDecoration: 'none', color: isHovered ? 'blue' : '#393f81', 
                          transition: 'color 0.3s'
                         }}
                          onMouseEnter={toggleHover}
                          onMouseLeave={toggleHover}
                        >
                          <Typography>
                            Don't have an account? 
                          </Typography>
                          <Typography>
                            Register Now
                          </Typography>
                        </Link>
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
    </Box>
  );
}

export default Loginpage;
