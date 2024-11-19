
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import SideBar from '~/pages/Boards/BoardContent/SideBars/SideBar'

import { Grid, Card, CardMedia, CardContent, Typography, Avatar, IconButton, Button, InputBase } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'

function QLBinhLuanBaiDang() {
  const HEIGHT_AD = '200PX'
  const [searchValue, setSearchValue] = useState('')

  const handleTimKiem = () => {
    if (searchValue) {
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(`http://localhost:3000/search2-admin?q=${searchValue}`)
          const data = await response.json()
          setMonAns(data)
        } catch (error) {
          console.error('Error fetching search results:', error)
        }
      }
      fetchSearchResults()
    } else {
      setMonAns([])
    }
  }

  const [data, setMonAns] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/board-admin')
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message)
        }
        const result = await response.json()
        setMonAns(result)
      } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error)
      }
    }
    fetchData()
  }, [])
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
            {data.length === 0 ?(
              <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 3 }}>
              Không có kết quả cần tìm
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {data.map(item => (
                  <Grid item xs={12} sm={6} md={3} key={item.ID}>
                    <Link to={`/chitietmonan/${item.ID}`} style={{ textDecoration:'none' }} >
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.image}
                          alt='Ảnh Của Admin Quan Li'
                        />
                        <CardContent>
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography variant="body2" color="textSecondary">{item.moTa}</Typography>
                          <IconButton size="small">
                            <BookmarkBorderIcon />
                          </IconButton>
                          <Typography variant="body2" color="textSecondary">
                            Tác giả: {item.fullName}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default QLBinhLuanBaiDang