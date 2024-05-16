import React, { useState, useContext, ChangeEvent, FormEvent } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Grid, Card, CardMedia, CardContent,Box } from '@mui/material';
import { Fullscreen } from '@mui/icons-material';
import Navbar from './Navbar';

function Registerpage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const toggleHover = () => {
    setIsHovered(prevState => !prevState);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(email, username, password, password2);
  };

  return (
    <Box >
      <Navbar></Navbar>
      <Container style={{marginTop:'50px'}}>
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
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={username}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        value={password2}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value)}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1rem' }}
                      >
                        Register
                      </Button>
                    </form>
                    <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: 10 }}>
                        <Link to="/login" style={{ 
                          textDecoration: 'none', color: isHovered ? 'blue' : '#393f81', 
                          transition: 'color 0.3s'
                         }}
                          onMouseEnter={toggleHover}
                          onMouseLeave={toggleHover}>
                            <Typography>Already have an account? </Typography>
                            <Typography>Login Now</Typography>
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

export default Registerpage;
