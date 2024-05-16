import { useState } from 'react';
import useAxios from '../utils/useAxios';
import { jwtDecode } from 'jwt-decode';
import { FaSearch } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import { Button,Checkbox,FormControlLabel, Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const API_KEY = 'COS1ZP4GP0ERKQIN';

interface TableData {
  date: string;
  timeZone: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

function Dashboard() {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const arilabel = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleToggle = () => {
    setIsToggled(prevState => !prevState);
  };
  const api = useAxios();
  const token = localStorage.getItem('authTokens');
  let username: string | undefined;

  if (token) {
    const decode: { username: string } = jwtDecode(token);
    username = decode.username;
  }

  const submitHandler = async () => {
    try {
      const inputValue = (document.getElementById('form1') as HTMLInputElement).value;
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${inputValue}&interval=5min&apikey=${API_KEY}`
      );
      const data = await response.json();
      setSearchValue(inputValue);
      setIsSearched(true);

      const timeSeriesData = data['Time Series (5min)'];
      const formattedData = Object.keys(timeSeriesData).map((timestamp) => ({
        date: timestamp.split(' ')[0],
        timeZone: timestamp.split(' ')[1],
        open: timeSeriesData[timestamp]['1. open'],
        high: timeSeriesData[timestamp]['2. high'],
        low: timeSeriesData[timestamp]['3. low'],
        close: timeSeriesData[timestamp]['4. close'],
        volume: timeSeriesData[timestamp]['5. volume'],
      }));

      setTableData(formattedData);

      const watchListResponse = await api.get('/watchlist/', { params: { stock_symbol: inputValue } });
      const watchListData: any[] = watchListResponse.data;
      const symbolExists: boolean = watchListData.some((item: any) => item.stock_symbol === inputValue);
      setIsInWatchlist(symbolExists);
    } catch (error) {
      setIsSearched(false);
      alert("No api found or may be 25 free use of API is exhausted")
    }
  };

  const handleWatchlistChange = async () => {
    if (isInWatchlist) {
      const inputValue = (document.getElementById('form1') as HTMLInputElement).value;
      const watchListResponse = await api.get('/watchlist/', { params: { stock_symbol: inputValue } });
      const itemToRemove: any = watchListResponse.data.find((item: any) => item.stock_symbol === inputValue);
      try {
        await api.delete(`/watchlist/${itemToRemove.id}/`);
        setIsInWatchlist(false);
      } catch (error) {
        console.error('Error deleting from watchlist:', error);
      }
    } else {
      try {
        const response = await api.post('/watchlist/', { stock_symbol: searchValue });
        setIsInWatchlist(true);
        console.log('Added to watchlist:', response.data);
      } catch (error) {
        console.error('Error adding to watchlist:', error);
      }
    }
  };
  return (
    <div>
      <div style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Typography variant="h3">My Dashboard</Typography>
              <span>Hello {username}!</span>
              <div style={{ display: 'flex' }}>
                <Search  style={{border:'1px solid black', marginRight:'2px'}}>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    id="form1"
                  />
                </Search>
                <Button variant="contained" color="primary" onClick={submitHandler}>
                  <SearchIconWrapper onClick={submitHandler}>
                    <SearchIcon />
                  </SearchIconWrapper>
                </Button>
              </div>
            </div>
  
            {isSearched && (
              <div>
                <div style={{ borderTop: '1px solid #ccc', paddingTop: '10px', marginBottom: '10px', display:'flex', justifyContent:'center', alignItems:'center' }}>
                    <FormControlLabel
                      label={searchValue}
                      control={
                        <Checkbox
                          {...arilabel}
                          id='watchlist'
                          checked={isInWatchlist}
                          onChange={handleWatchlistChange}
                          name="isInWatchlist"
                          icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                        />
                      }
                    />
                </div>
                <div className="table-responsive">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Time Zone (US/Eastern)</TableCell>
                        <TableCell>Open</TableCell>
                        <TableCell>High</TableCell>
                        <TableCell>Low</TableCell>
                        <TableCell>Close</TableCell>
                        <TableCell>Volume</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.timeZone}</TableCell>
                          <TableCell>{row.open}</TableCell>
                          <TableCell>{row.high}</TableCell>
                          <TableCell>{row.low}</TableCell>
                          <TableCell>{row.close}</TableCell>
                          <TableCell>{row.volume}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
