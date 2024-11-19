import { Grid, Card, CardMedia, CardContent, Typography,Avatar, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'


import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { Style } from '@mui/icons-material'

import { useState, useEffect } from 'react'

const RecipeGrid = () => {
  const [data, setMonAns] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/board-admin')
      .then(response => response.json())
      .then(data => {
        setMonAns(data)
      })
      .catch(error => console.error('Error:', error))
  }, [])
  
  return (
    <Grid container spacing={2}>
      {data.map(item => (
        <Grid item xs={12} sm={6} md={3} key={item.ID}>
          <Link to={`/chitietmonan/${item.ID}`} style={{ textDecoration:'none' }} >
            <Card>
              <CardMedia
                component="img"
                height="140"
                image= {`/${item.image}`}
                alt={item.image}
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
  )
}
export default RecipeGrid
