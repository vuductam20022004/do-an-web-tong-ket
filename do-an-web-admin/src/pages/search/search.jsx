
import AppBar from '~/components/AppBar/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Grid, Card, CardMedia, CardContent, Typography,Avatar, IconButton, InputBase, Button } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import SearchIcon from '@mui/icons-material/Search'


import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


import SideBar from '~/pages/Boards/BoardContent/SideBars/SideBar'
const Search = () => {
  const HEIGHT_AD = '200PX'
  const queryParams = new URLSearchParams(location.search)
  const searchValue1 = queryParams.get('query')
  // const searchValue2 = searchValue1
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState('')
  const [data, setSearchResults] = useState([])

  const handleTimKiem = () => {
    // searchValue1 = searchValue
  }
  
  useEffect(() => {
    if (searchValue1) {
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(`http://localhost:3000/search2-admin?q=${searchValue1}`)
          const data = await response.json()
          setSearchResults(data)
        } catch (error) {
          console.error('Error fetching search results:', error)
        }
      }
      fetchSearchResults()
    } else {
      setSearchResults([])
    }
  })

  if (data.length === 0) {
    return (
      <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
        <AppBar />
        <Box sx={{
          display:'flex'
        }}>
          <Box sx={{
            bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
            height:(theme) => theme.trello.boardContentHeight,
            width:'15% ',
            p: '10px 0'
          }}>
            <SideBar />
          </Box>
          <Box sx={{
            bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
            height:(theme) => theme.trello.boardContentHeight,
            width:'85% ',
            p: '10px 15px',
            overflow: 'auto'
          }}> Không có kết quả tìm kiếm
          </Box>
        </Box>
      </Container>
    )
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
      <AppBar />

      <Box sx={{
        display:'flex'
      }}>
        <Box sx={{
          bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
          height:(theme) => theme.trello.boardContentHeight,
          width:'15% ',
          p: '10px 0'
        }}>
          <SideBar />

        </Box>

        <Box sx={{
          bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
          height:(theme) => theme.trello.boardContentHeight,
          width:'85% ',
          p: '10px 15px',
          overflow: 'auto'
        }}>
          {/* anh quang cao */}
          <Box sx={{
            bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
            height:HEIGHT_AD,
            width:'85%',
            p: '10px 15px'
            // overflow: 'auto'
          }}>
            <InputBase
              placeholder="Tìm kiếm món ăn"
              startAdornment={<SearchIcon sx={{ mr: 1 }} />}
              sx={{
                backgroundColor: '#F0F0F0',
                padding: '5px 10px',
                borderRadius: 2,
                width: '300px',
                color:'black',
                ml:'18%'
              }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button variant="contained" color="secondary" sx={{ ml: 1 }} onClick={handleTimKiem}>
              Tìm kiếm
            </Button>
          </Box>
          <Box sx={{
            bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
            height:(theme) => theme.trello.boardContentHeight - HEIGHT_AD,
            width:'85% ',
            p: '10px 15px',
            overflow: 'auto'
          }}>
            <Grid container spacing={2}>
              {data.map(item => (
                <Grid item xs={12} sm={6} md={3} key={item.ID}>
                  <Link to={`/chitietmonan/${item.ID}`} style={{ textDecoration:'none' }} >
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image= {item.image}
                        alt='Ảnh Tìm kiếm'
                      />
                      <CardContent>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{item.moTa}</Typography>
                        <IconButton size="small">
                          <BookmarkBorderIcon />
                        </IconButton>
                        <Typography variant="body2" color="textSecondary">
                          {item.userId} Tác giả
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>

  )
}

export default Search