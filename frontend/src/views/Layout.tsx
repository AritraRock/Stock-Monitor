import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
    children:React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {/* <CssBaseline /> */}
      <Navbar />
      <Box sx={{ display: 'flex', width: '100%', marginTop: '64px' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, mx:'auto' }} // Adjust marginLeft to the width of your sidebar
        >
          {children}
        </Box>
        </Box>
    </Box>
  );
};

export default Layout;
