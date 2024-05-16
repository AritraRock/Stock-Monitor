import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home,Layers } from '@mui/icons-material';
const drawerWidth = 240;
const Sidebar = () => {
  return (
      <Drawer
        variant="permanent"
        anchor="left"
        className="bg-light"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', marginTop:'100px' },
      }}
      >
        <div className="sidebar-sticky mt-4">
          <List>
            <ListItem  component="a" href="/dashboard">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="My Dashboard" />
            </ListItem>
            <ListItem  component="a" href="/watchlist">
              <ListItemIcon>
                <Layers />
              </ListItemIcon>
              <ListItemText primary="My Watchlist" />
            </ListItem>
          </List>
        </div>
      </Drawer>
  );
}

export default Sidebar;
