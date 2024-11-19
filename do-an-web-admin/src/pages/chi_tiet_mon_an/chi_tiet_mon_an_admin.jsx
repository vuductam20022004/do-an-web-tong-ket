
import { useState } from 'react'
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  colors
} from '@mui/material'
import { AccessTime, Group } from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { red } from '@mui/material/colors'

import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Flip, toast } from 'react-toastify'


function RecipeDetail() {
  const { ID } = useParams()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const fullNameUser = localStorage.getItem('token')
  const [recipe, setRecipe] = useState(null)
  const navigate = useNavigate()
  const nameUserJWTDecode = jwtDecode(fullNameUser)
  const [openDialog, setOpenDialog] = useState(false)
  const [openDialog1, setOpenDialog1] = useState(false)
  const [IDbinhLuan, setIDbinhLuan] = useState(null)


  const handleOpenDialog = (IDbinhLuan) => {
    setIDbinhLuan(IDbinhLuan)
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
    // setSelectedId(null)
  }


  const handleOpenDialog1 = () => {
    setOpenDialog1(true)
  }
  const handleCloseDialog1 = () => {
    setOpenDialog1(false)
    // setSelectedId(null)
  }


  const handleXoaComment = async (IDbinhLuan) => {
    try {
      const response = await axios.post('http://localhost:3000/xoa-comment-admin', { IDbinhLuan }, {
      })
      if (response.data.success) {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Flip
        })
        window.location.reload()
      } else {
        toast.error(response.data.message, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Flip
        })
      }
    } catch (error) {
      console.error('Đăng ký lỗi:', error)
      alert('Lỗi trong quá trình xóa comment')
    }
  }


  //Click button xoa bai viet
  const handleClickXoaBaiViet = async() => {
    try {
      const response = await axios.post('http://localhost:3000/xoa-bai-viet-admin', { ID }, {
      })
      if (response.data.success) {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Flip
        })
        navigate('/quan-li-binh-luan-bai-dang')
      } else {
        toast.error(response.data.message, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Flip
        })
      }
    } catch (error) {
      console.error('Đăng ký lỗi:', error)
      alert('Lỗi trong quá trình xóa')
    }
  }


  useEffect(() => {

    //hàm fetchRecipeDetail để gọi API lấy dữ liệu theo ID
    const fetchRecipeDetail = async (id) => {
      try {
        // const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/chitietmonan-admin/${id}`)
        const data = await response.json()
        setRecipe(data[0])
        setComments(data)
        // Cập nhật state với dữ liệu món ăn
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết món ăn:', error)
      }
    }
    fetchRecipeDetail(ID) // Gọi hàm fetch API
  }, [ID])

  if (!recipe) {
    return <Typography>Loading...</Typography>
  }


  return (
    <Box sx={{ p: 2, maxWidth: '600px', margin: '0 auto' }}>


      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src = {`../${recipe.image}`} alt='Ảnh chi tiết món ăn'
          height='300px'/>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTime sx={{ mr: 1 }} />
          <Typography>{recipe.timeNau} phút</Typography>
          <Group sx={{ ml: 3, mr: 1 }} />
          <Typography>{recipe.khauPhan} người</Typography>
          {/* <Group sx={{ ml: 3, mr: 1 }} /> */}
          <Typography variant='h6' sx={{ ml: '50px' } } align='right' >{recipe.core} ĐIỂM</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          color="primary"
          onClick={handleOpenDialog1}
        >
      Xóa bài viết
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h4">{recipe.name}</Typography>
        <Typography color="text.secondary">Suy nghĩ của tác giả: {recipe.moTa}</Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Các nguyên liệu:</Typography>
        {/* <Typography variant="">{recipe.nguyenLieu}</Typography> */}
        <TextField
          fullWidth
          label=""
          name="steps"
          value={recipe.nguyenLieu}
          variant="outlined"
          multiline
          rows={4}
          InputProps={{
            readOnly: true
          }}
        />

      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Các bước làm</Typography>
        <TextField
          fullWidth
          label=""
          name="steps"
          value={recipe.step}
          variant="outlined"
          multiline
          rows={4}
          InputProps={{
            readOnly: true
          }}
        />

      </Box>

      <Divider sx={{ my: 3 }} />
      <Box>
        <Typography variant="h6">Bình luận ({comments.length })</Typography>
        <List>
          {comments.map(item => (
            <ListItem key={item.IDbinhLuan}>
              <ListItemAvatar>
                <Avatar alt={item.fullName} sx={{ cursor:'pointer' }} src={`../${item.imageUser}`} />
              </ListItemAvatar>
              <ListItemText
                primary={item.fullName}
                secondary={item.comment}
                sx={{ cursor:'pointer' }}
                onClick ={() => {handleOpenDialog(item.IDbinhLuan)}}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa bình luận này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Hủy</Button>
          <Button onClick={() => {handleXoaComment(IDbinhLuan)}} color="secondary">Xóa</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog1} onClose={handleCloseDialog1}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa vĩnh viễn bài viết này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog1} color="primary">Hủy</Button>
          <Button onClick={handleClickXoaBaiViet} color="secondary">Xóa</Button>
        </DialogActions>
      </Dialog>

    </Box>
  )
}

export default RecipeDetail
