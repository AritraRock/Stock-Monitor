import { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import Sidebar from './Sidebar';
import { Container, Typography, Checkbox, FormControlLabel } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Alert, Snackbar } from "@mui/material";

const MyWatchList = () => {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(true);
  const arilabel = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const api = useAxios();
  const [alert, setAlert] = useState<{ message: string; severity: "success" | "error" } | null>(null);
  const showAlert = (message: string, severity: "success" | "error") => {
    setAlert({ message, severity });
  };
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await api.get("/watchlist/");
        setWatchlist(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('There was an error fetching the watch list!', error);
      }
    };
    fetchWatchlist();
  }, []);

  const handleWatchlistChange = async (symbol: string) => {
    if (isInWatchlist) {
      //remove
      const watchListResponse = await api.get("/watchlist/", { params: { stock_symbol: symbol } });
      const itemToRemove = watchListResponse.data.find((item: any) => item.stock_symbol === symbol);
      console.log(itemToRemove);
      try {
        await api.delete(`/watchlist/${itemToRemove.id}/`);
        setAlert({ message: "Removed from My Watchlist", severity: "success" });
        setWatchlist(watchlist.filter(item => item.stock_symbol !== symbol));
      } catch (error) {
        console.error('Error deleting from watchlist:', error);
      }
    } else {
      console.error('Dont do this');
    }
  }

  return (
    <div>
      <Container style={{ paddingTop: "20px" }}>
        <div className="row">
          <Sidebar />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            {alert && (
              <Snackbar open={true} autoHideDuration={3000} onClose={() => setAlert(null)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                  }} >
                  <Alert severity={alert.severity}>{alert.message}</Alert>
              </Snackbar>
            )}
            <div>
              <Typography variant="h3" style={{marginBottom:'10px'}}>My Watchlist</Typography>
              <div style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column',
              borderTop: '1px solid #ccc', paddingTop: '10px', marginBottom: '10px', }}>
                {watchlist.map(item => (
                  <div key={item.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                    <div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...arilabel}
                            id="watchlist"
                            checked={isInWatchlist}
                            onChange={() => handleWatchlistChange(item.stock_symbol)}
                            name="isInWatchlist"
                            icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                            />
                          }
                          label={item.stock_symbol}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </Container>
    </div>
  );
};

export default MyWatchList;
